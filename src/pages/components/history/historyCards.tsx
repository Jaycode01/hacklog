"use client";

import { useState, useEffect } from "react";
import { Goal, TrafficCone } from "lucide-react";
import { auth, db } from "@/firebase/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";

interface Standup {
  id: string;
  date: string;
  yesterday: string;
  priorities: string;
  blockers: string;
}

export default function HistoryCards({ searchQuery }: { searchQuery: string }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [standups, setStandups] = useState<Standup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  console.log(userId);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);

        const q = query(
          collection(db, "standups"),
          where("uid", "==", user.uid),
          orderBy("date", "desc")
        );
        const snapshot = await getDocs(q);
        const logs: Standup[] = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          logs.push({
            id: doc.id,
            date: data.date,
            yesterday: data.yesterday,
            priorities: data.priorities,
            blockers: data.blockers,
          });
        });

        setStandups(logs);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const filtered = standups.filter((log) =>
    log.yesterday.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="p-10 text-lg">Loading histories...</div>;
  }

  if (!filtered.length) {
    return <div className="p-10 text-lg">No standups matched your search.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-5 md:p-10">
      {filtered.map((log) => {
        const isExpanded = expandedIds.includes(log.id);

        const toggleExpanded = () => {
          setExpandedIds((prev) =>
            prev.includes(log.id)
              ? prev.filter((id) => id !== log.id)
              : [...prev, log.id]
          );
        };

        return (
          <div
            key={log.id}
            className="bg-white shadow-lg p-5 rounded-md h-fit flex flex-col gap-3"
          >
            <p className="text-[18px] font-semibold">
              {new Date(log.date).toDateString()}
            </p>

            <div className="flex flex-row items-center gap-6">
              <p className="flex flex-row items-center gap-1.5">
                <Goal />
                <span>
                  {
                    log.priorities
                      .split(",")
                      .filter((p: string) => p.trim() !== "").length
                  }{" "}
                  goal(s)
                </span>
              </p>
              <p className="flex flex-row items-center gap-1.5">
                <TrafficCone />
                <span>
                  {
                    log.blockers
                      .split(",")
                      .filter((b: string) => b.trim() !== "").length
                  }{" "}
                  blocker(s)
                </span>
              </p>
            </div>

            <p className={`text-gray-700 ${!isExpanded ? "line-clamp-1" : ""}`}>
              {log.yesterday}
            </p>
            <button
              onClick={toggleExpanded}
              className="text-sm text-blue-600 underline w-fit"
            >
              {isExpanded ? "See less" : "See more"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
