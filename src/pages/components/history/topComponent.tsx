"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { ChevronDown } from "lucide-react";
import { MagnifyingGlass } from "phosphor-react";

interface Props {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  onFilterChange: (filter: string) => void;
}

export default function TopComponent({
  searchQuery,
  setSearchQuery,
  onFilterChange,
}: Props) {
  const [openFIlterOne, setopenFIlterOne] = useState(false);

  const handleFilterClick = (filter: string) => {
    onFilterChange(filter);
    setopenFIlterOne(false);
  };

  return (
    <div>
      <div className="flex flex-row justify-end px-5 md:px-10 pt-5 gap-5">
        <div className="flex flex-row items-center gap-2 w-[60%] md:w-[30%] border border-gray-600 p-3.5 rounded">
          <label htmlFor="search-history">
            <MagnifyingGlass size={25} />
          </label>
          <input
            type="search"
            id="search-history"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-inherit outline-none"
            placeholder="Search yesterday's summary..."
          />
        </div>
        <div className="relative">
          <button
            type="button"
            onClick={() => setopenFIlterOne((prev) => !prev)}
            className="flex flex-row items-center gap-1.5 border border-gray-600 rounded p-3.5 cursor-pointer"
          >
            Filter <ChevronDown />
          </button>
          {openFIlterOne && (
            <div className="bg-white shadow-md p-3 border border-gray-600 list-none absolute z-30 top-auto mt-0.5 right-0 w-[150px] transition-all duration-500 ease-in-out">
              {["This Week", "Last Week", "This Month", "This Year"].map(
                (label) => (
                  <li
                    key={label}
                    className="hover:text-green-600 cursor-pointer"
                    onClick={() => handleFilterClick(label)}
                  >
                    {label}
                  </li>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
