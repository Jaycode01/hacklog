"use client";

import React, { useState } from "react";
import { auth, db } from "@/firebase/firebaseClient";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function StandupForm() {
  const [userId, setuserId] = useState<string | null>(null);
  const [yesterday, setyesterday] = useState("");
  const [progress, setprogress] = useState(0);
  const [priorities, setpriorities] = useState("");
  const [energy, setenergy] = useState(3);
  const [blockers, setblockers] = useState("");
  const [needs, setneeds] = useState("");

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setuserId(user.uid);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    const today = new Date().toISOString().split("T")[0];

    try {
      await addDoc(collection(db, "standups"), {
        uid: userId,
        date: today,
        yesterday,
        progress,
        priorities,
        energy,
        blockers,
        needs,
      });

      alert("Today's Standup submitted successfully");
      setyesterday("");
      setprogress(0);
      setpriorities("");
      setenergy(3);
      setblockers("");
      setneeds("");
    } catch (error) {
      console.error("Error submitting today's standup:", error);
      alert("Failed to submit today's standup.");
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center h-auto py-10">
        <form onSubmit={handleSubmit} className="w-[90%] md:w-[50%]">
          <div className="border border-gray-600 rounded-md p-5 flex flex-col gap-5">
            <div className=" flex flex-col gap-2">
              <label
                htmlFor="yesterday-accomplish"
                className="text-[18px] font-semibold"
              >
                What did I accomplish yesterday ?
              </label>
              <textarea
                id="yesterday-accomplish"
                value={yesterday}
                onChange={(e) => setyesterday(e.target.value)}
                className="outline-none border border-gray-600 p-3 rounded text-inherit min-h-[150px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-semibold">
                How did I feel about my progress ?
              </label>
              <input
                type="number"
                defaultValue="0"
                max="5"
                min="0"
                value={progress}
                onChange={(e) => setprogress(Number(e.target.value))}
                className="border border-gray-600 p-2 rounded outline-none"
              />
            </div>
          </div>
          <div className="mt-5 border border-gray-600 rounded-md p-5 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold text-[18px]">
                What are my top 3 priorities today ?
              </label>
              <textarea
                value={priorities}
                onChange={(e) => setpriorities(e.target.value)}
                className="min-h-[150px] text-inherit outline-none border border-gray-600 rounded p-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-semibold">
                My energy level right now ?
              </label>
              <input
                type="range"
                color="green-600"
                value={energy}
                onChange={(e) => setenergy(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 p-5 border border-gray-600 rounded-md mt-5">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[18px]">
                {`What's`} blocking my progress ?
              </label>
              <textarea
                value={blockers}
                onChange={(e) => setblockers(e.target.value)}
                className="min-h-[150px] border border-gray-600 outline-none p-3 text-inherit rounded"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-semibold">
                What do I need to move forward ?
              </label>
              <textarea
                value={needs}
                onChange={(e) => setneeds(e.target.value)}
                className="border border-gray-600 outline-none text-inherit p-3 rounded min-h-[150px]"
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-center py-3 bg-green-600 text-white w-full  mt-5 mb-5 rounded cursor-pointer hover:bg-green-500"
          >
            Complete Daily Standup
          </button>
        </form>
      </div>
    </div>
  );
}
