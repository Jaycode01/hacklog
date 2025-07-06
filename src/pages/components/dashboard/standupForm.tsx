"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "@/firebase/firebaseClient";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Styles from "../styles/dailyStandup.module.css";

export default function StandupForm() {
  const [userId, setUserId] = useState<string | null>(null);
  const [yesterday, setYesterday] = useState("");
  const [progress, setProgress] = useState(0);
  const [priorities, setPriorities] = useState("");
  const [energy, setEnergy] = useState(3);
  const [blockers, setBlockers] = useState("");
  const [needs, setNeeds] = useState("");
  const [submittedToday, setSubmittedToday] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          if (isMounted) {
            setUserId(null);
            setLoading(false);
          }
          return;
        }

        if (isMounted) {
          setUserId(user.uid);
        }

        const today = new Date().toISOString().split("T")[0];
        const standupsRef = collection(db, "standups");

        const q = query(
          standupsRef,
          where("uid", "==", user.uid),
          where("date", "==", today)
        );

        const snapshot = await getDocs(q);

        if (isMounted) {
          setSubmittedToday(!snapshot.empty);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        console.error("Error checking auth state:", err);
        if (isMounted) {
          setError("Failed to load user data");
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError("Please log in to submit standup");
      return;
    }

    // Validate required fields
    if (!yesterday.trim() || !priorities.trim()) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    const today = new Date().toISOString().split("T")[0];

    try {
      await addDoc(collection(db, "standups"), {
        uid: userId,
        date: today,
        yesterday: yesterday.trim(),
        progress,
        priorities: priorities.trim(),
        energy,
        blockers: blockers.trim(),
        needs: needs.trim(),
        completed: true,
        createdAt: new Date(),
      });

      setSubmittedToday(true);

      // Reset form
      setYesterday("");
      setProgress(0);
      setPriorities("");
      setEnergy(3);
      setBlockers("");
      setNeeds("");

      setError(null);
    } catch (error) {
      console.error("Error submitting standup:", error);
      setError("Failed to submit standup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">
          Please log in to access standup form
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-auto py-10">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-[90%] md:w-[50%]">
            {error}
          </div>
        )}

        {submittedToday ? (
          <div
            className={`text-center text-gray-700 mt-[20%] font-semibold text-xl ${Styles.pageHeader}`}
          >
            {`You've`} already submitted {`today's`} standup.
            <br />
            Come back tomorrow to maintain your streak!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-[90%] md:w-[50%]">
            <div className="border border-gray-600 rounded-md p-5 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="yesterday-accomplish"
                  className="text-[18px] font-semibold"
                >
                  What did I accomplish yesterday? *
                </label>
                <textarea
                  id="yesterday-accomplish"
                  value={yesterday}
                  onChange={(e) => setYesterday(e.target.value)}
                  className="outline-none border border-gray-600 p-3 rounded text-inherit min-h-[150px]"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[18px] font-semibold">
                  How did I feel about my progress? (0-5)
                </label>
                <input
                  type="number"
                  max="5"
                  min="0"
                  value={progress}
                  onChange={(e) => setProgress(Number(e.target.value))}
                  className="border border-gray-600 p-2 rounded outline-none"
                />
              </div>
            </div>

            <div className="mt-5 border border-gray-600 rounded-md p-5 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="priorities"
                  className="font-semibold text-[18px]"
                >
                  What are my top 3 priorities today? *
                </label>
                <textarea
                  id="priorities"
                  value={priorities}
                  onChange={(e) => setPriorities(e.target.value)}
                  className="min-h-[150px] text-inherit outline-none border border-gray-600 rounded p-3"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[18px] font-semibold">
                  My energy level right now? ({energy}/5)
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-5 p-5 border border-gray-600 rounded-md mt-5">
              <div className="flex flex-col gap-2">
                <label className="font-semibold text-[18px]">
                  {`What's`} blocking my progress?
                </label>
                <textarea
                  value={blockers}
                  onChange={(e) => setBlockers(e.target.value)}
                  className="min-h-[150px] border border-gray-600 outline-none p-3 text-inherit rounded"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[18px] font-semibold">
                  What do I need to move forward?
                </label>
                <textarea
                  value={needs}
                  onChange={(e) => setNeeds(e.target.value)}
                  className="border border-gray-600 outline-none text-inherit p-3 rounded min-h-[150px]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`text-center py-3 text-white w-full mt-5 mb-5 rounded cursor-pointer transition-colors ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {loading ? "Submitting..." : "Complete Daily Standup"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
