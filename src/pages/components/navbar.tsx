"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, Menu, UserRound, X } from "lucide-react";
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
  const [openMenu, setopenMenu] = useState(false);

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
    <div className="relative bg-white shadow-lg flex flex-row justify-between items-center px-10 py-5">
      <div className="" onClick={() => router.push("/")}>
        <Image src={Logo} alt="hacklog logo" width={70} height={70} />
      </div>
      {user && (
        <div
          className={`absolute md:relative left-0 top-[120px] w-full md:w-auto md:top-0 z-50 
          flex-col md:flex-row items-center justify-center md:justify-start gap-14 
          py-7 md:py-0 bg-white md:bg-inherit border-t md:border-none border-gray-200 
          transition-all duration-300 ease-in-out
          ${openMenu ? "flex" : "hidden"} md:flex`}
        >
          <Link
            href="/today"
            className="text-[18px] text-gray-900 hover:text-green-600 hover:border-b-2 border-green-600"
          >
            Today
          </Link>
          <Link
            href="/history"
            className="text-[18px] text-gray-900 hover:text-green-600 hover:border-b-2 border-green-600"
          >
            History
          </Link>
          <Link
            href="/goals"
            className="text-[18px] text-gray-900 hover:text-green-600 hover:border-b-2 border-greem-600"
          >
            Goals
          </Link>
          <Link
            href="/analytics"
            className="text-[18px] text-gray-900 hover:text-green-600 hover:border-b-2 border-green-600"
          >
            Analytics
          </Link>
        </div>
      )}

      {user ? (
        <div className="flex items-center flex-row gap-7">
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
                  <button className="hover:text-green-600 text-left cursor-pointer">
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
          <button
            type="button"
            className="text-gray-600 flex md:hidden cursor-pointer"
            onClick={() => setopenMenu((prev) => !prev)}
          >
            {" "}
            {openMenu ? <X /> : <Menu />}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => router.push("/get-started")}
          className="text-white bg-green-600 px-7 py-3.5 text-[20px] rounded cursor-pointer flex flex-row items-center gap-1.5"
        >
          Get Started
          <ChevronRight />
        </button>
      )}
    </div>
  );
}
