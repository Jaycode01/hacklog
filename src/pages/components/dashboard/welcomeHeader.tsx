"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/firebase/firebaseClient";
import { getDoc, doc } from "firebase/firestore";
import { Calendar, HandWaving } from "phosphor-react";

export default function WelcomeHeader() {
  const [firstName, setfirstName] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const fullName = docSnap.data().name || "";
          const first = fullName.trim().split(" ")[0];
          setfirstName(first);
        }
      }
    });

    return () => unsubscribe();
  });

  const formatDate = () => {
    const today = new Date();

    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
    };

    const weekday = today.toLocaleDateString("en-US", options);
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getDate() + 1).padStart(2, "0");
    const year = String(today.getFullYear()).slice(-2);

    return `${weekday}: ${month} | ${day} | ${year}`;
  };

  const currentDate = formatDate();

  return (
    <div className="px-5 py-3 flex flex-row justify-between items-center">
      <h1 className="flex flex-row items-center text-[25px] gap-1.5">
        {firstName ? `Welcome back, ${firstName}` : "Welcome"}{" "}
        <HandWaving size={30} />
      </h1>
      <div className="">
        <p className="text-gray-500 text-[17px] flex items-center gap-1.5">
          <Calendar size={25} /> {currentDate}
        </p>
      </div>
    </div>
  );
}
