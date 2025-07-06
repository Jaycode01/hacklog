"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MagnifyingGlass } from "phosphor-react";

export default function TopComponent() {
  const [openFIlterOne, setopenFIlterOne] = useState(false);

  return (
    <div>
      <div className="flex flex-row justify-end px-7 pt-5 gap-5">
        <div className="flex flex-row items-center gap-2 w-[30%] border border-gray-600 p-3.5 rounded">
          <label htmlFor="search-history">
            <MagnifyingGlass size={25} />
          </label>
          <input
            type="search"
            id="search-history"
            className="w-full text-inherit outline-none"
          />
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setopenFIlterOne((prev) => !prev)}
            className="flex flex-row items-center gap-1.5 border border-gray-600 rounded p-3.5 cursor-pointer"
          >
            Filter <ChevronDown />{" "}
          </button>
          {openFIlterOne && (
            <div className="bg-white shadow-md p-3 border border-gray-600 list-none absolute z-30 top-auto mt-0.5 right-0 w-[150px] transition-all duration-500 ease-in-out">
              <li className="hover:text-green-600 cursor-pointer">This Week</li>
              <li className="hover:text-green-600 cursor-pointer">Last Week</li>
              <li className="hover:text-green-600 cursor-pointer">
                This Month
              </li>
              <li className="hover:text-green-600 cursor-pointer">This Year</li>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
