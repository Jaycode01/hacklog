import React from "react";

export default function standupForm() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-auto py-10">
        <form className="w-[90%] md:w-[50%]">
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
                className="border border-gray-600 p-2 rounded outline-none"
              />
            </div>
          </div>
          <div className="mt-5 border border-gray-600 rounded-md p-5 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="" className="font-semibold text-[18px]">
                What are my top 3 priorities today ?
              </label>
              <textarea className="min-h-[150px] text-inherit outline-none border border-gray-600 rounded p-3" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-semibold">
                My energy level right now ?
              </label>
              <input type="range" color="green-600" />
            </div>
          </div>
          <div className="flex flex-col gap-5 p-5 border border-gray-600 rounded-md mt-5">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-[18px]">
                {`What's`} blocking my progress ?
              </label>
              <textarea className="min-h-[150px] border border-gray-600 outline-none p-3 text-inherit rounded" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[18px] font-semibold">
                What do I need to move forward ?
              </label>
              <textarea className="border border-gray-600 outline-none text-inherit p-3 rounded min-h-[150px]" />
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
