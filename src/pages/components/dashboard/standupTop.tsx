"use client";

import { useState, useEffect } from "react";
import { FireSimple } from "phosphor-react";
import Styles from "../styles/dailyStandup.module.css";
import { auth, db } from "@/firebase/firebaseClient";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from "firebase/firestore";

interface StandupData {
  date: string;
  uid: string;
  completed: boolean;
  createdAt: Timestamp;
}

export default function StandupTop() {
  const [currentDate, setCurrentDate] = useState("");
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState<"Pending" | "Completed">("Pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper functions
  const getTodayDateStr = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getTodayKey = (): string => {
    return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const getDateKey = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const checkTodayStatus = async (user: User): Promise<void> => {
    try {
      const todayKey = getTodayKey();
      const standupsRef = collection(db, "standups");

      const q = query(
        standupsRef,
        where("uid", "==", user.uid),
        where("date", "==", todayKey)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        setStatus("Completed");
      } else {
        setStatus("Pending");
      }
    } catch (error) {
      console.error("Error checking today's status:", error);
      setStatus("Pending");
      throw error;
    }
  };

  const calculateStreak = async (user: User): Promise<void> => {
    try {
      const standupsRef = collection(db, "standups");
      const q = query(
        standupsRef,
        where("uid", "==", user.uid),
        orderBy("date", "desc")
      );

      const snapshot = await getDocs(q);
      const completedDates = new Set<string>();

      snapshot.forEach((doc) => {
        const data = doc.data() as StandupData;
        // Consider any existing entry as completed (since we only store completed standups)
        completedDates.add(data.date);
      });

      // Calculate streak starting from today going backwards
      let currentStreak = 0;
      const today = new Date();

      // Start from today and go backwards
      for (let i = 0; i < 365; i++) {
        // Max 365 days to prevent infinite loop
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateKey = getDateKey(checkDate);

        if (completedDates.has(dateKey)) {
          currentStreak++;
        } else {
          break; // Streak is broken
        }
      }

      setStreak(currentStreak);
    } catch (error) {
      console.error("Error calculating streak:", error);
      setStreak(0);
      throw error;
    }
  };

  useEffect(() => {
    let isMounted = true;

    // Set current date immediately
    setCurrentDate(getTodayDateStr());

    const loadUserData = async (user: User): Promise<void> => {
      try {
        setLoading(true);
        setError(null);

        await Promise.all([checkTodayStatus(user), calculateStreak(user)]);
      } catch (error) {
        console.error("Error loading user data:", error);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;

      if (user) {
        await loadUserData(user);
      } else {
        setStatus("Pending");
        setStreak(0);
        setLoading(false);
        setError(null);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  if (error) {
    return (
      <div className="px-5 md:px-10 py-5">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[16px] md:text-[18px] px-5 md:px-10 pt-5 italic font-semibold">
        You are on fire, keep working hard champ...
      </p>
      <div className="flex flex-col md:flex-row w-full justify-start md:justify-between px-5 md:px-10 py-7 items-start md:items-center gap-5">
        <h1
          className={`${Styles.pageHeader} text-[20px] md:text-[25px] font-semibold`}
        >
          Daily Standup - {currentDate}
        </h1>

        <div className="flex items-center gap-5">
          <div className="border rounded border-gray-600 py-2.5 px-5 text-lg">
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`${
                status === "Completed" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {loading ? "Loading..." : status}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-red-200 py-2.5 px-5 border-red-500 border rounded-lg">
            <FireSimple size={20} className="text-red-500" />
            <span className="text-[20px] text-gray-900 font-semibold">
              {loading ? "..." : streak}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
