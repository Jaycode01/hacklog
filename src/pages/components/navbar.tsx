"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";

import Image from "next/image";
import Logo from "../../../public/images/hacklog-logo.png";

export default function Navbar() {
  const [user, setuser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setuser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white shadow-md flex flex-row justify-between items-center px-10 py-5">
      <div className="" onClick={() => router.push("/")}>
        <Image src={Logo} alt="hacklog logo" width={100} height={100} />
      </div>
      {user ? (
        <div className="">
          <button
            type="button"
            onClick={() => {
              signOut(auth);
              router.push("/");
            }}
            className="bg-red-500 p-3 text-white rounded"
          >
            Log out
          </button>
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
