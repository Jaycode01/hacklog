"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/images/hacklog-logo.png";
import { ChevronRight } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="bg-white shadow-md flex flex-row justify-between items-center px-10 py-5">
      <div className="" onClick={() => router.push("/")}>
        <Image src={Logo} alt="hacklog logo" width={100} height={100} />
      </div>
      <div className="">
        <button
          type="button"
          onClick={() => router.push("/get-started")}
          className="text-white bg-blue-300 px-7 py-3.5 text-[20px] rounded cursor-pointer flex flex-row items-center gap-1.5"
        >
          Get Started
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
