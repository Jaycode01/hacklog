"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseClient";

import Image from "next/image";
import Logo from "../../../public/images/hacklog-logo.png";
import Link from "next/link";

export default function Navbar() {
  const [user, setuser] = useState<User | null>(null);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [fullName, setfullName] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setuser(user);

      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setfullName(data.name || null);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const getFirstName = () => {
    if (!fullName) return "User";
    return fullName.split(" ")[0];
  };

  return (
    <div className="bg-white shadow-lg flex flex-row justify-between items-center px-10 py-5">
      <div className="" onClick={() => router.push("/")}>
        <Image src={Logo} alt="hacklog logo" width={90} height={90} />
      </div>
      {user && (
        <div className="">
          <Link href="/dashboard">Dashboard</Link>
        </div>
      )}
      {user ? (
        <div className="">
          <div className="relative">
            <button
              type="button"
              onClick={() => setdropdownOpen((prev) => !prev)}
              className="flex gap-1.5 items-center border border-gray-200 cursor-pointer p-3 rounded hover:bg-gray-50 h"
            >
              <UserRound
                className="border border-gray-300 rounded-full text-gray-500"
                size={30}
              />{" "}
              <span>{getFirstName()}</span>
            </button>
            {dropdownOpen && (
              <div className="bg-white border border-gray-300 w-[150px] shadow-md absolute top-[60px] right-0 h-fit p-3 rounded">
                <ul className="flex flex-col gap-1.5">
                  <button type="button" className="text-left cursor-pointer">
                    Mode
                  </button>{" "}
                  <button className="hover:text-blue-500 text-left cursor-pointer">
                    View profile
                  </button>
                  <button
                    onClick={() => {
                      signOut(auth);
                      router.push("/");
                    }}
                    className="text-red-500 cursor-pointer text-left font-semibold hover:underline"
                  >
                    Log Out
                  </button>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => router.push("/get-started")}
          className="text-white bg-blue-500 px-7 py-3.5 text-[20px] rounded cursor-pointer flex flex-row items-center gap-1.5"
        >
          Get Started
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
