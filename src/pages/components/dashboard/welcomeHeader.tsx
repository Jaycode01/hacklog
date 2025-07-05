import { FireSimple } from "phosphor-react";
import Styles from "../styles/dailyStandup.module.css";

export default function welcomeHeader() {
  return (
    <div>
      <div className="flex flex-row w-full justify-between px-10 py-7 items-center">
        <h1 className={`${Styles.pageHeader} text-[25px] font-semibold`}>
          Daily Standup - 05/07/2025
        </h1>
        <button
          type="button"
          className="flex items-center gap-1.5 bg-red-200 py-2.5 px-5 border-red-500 border rounded-lg"
        >
          <FireSimple size={20} className="text-red-500" />
          <span className="text-[20px] txt-gray-900 font-semibold">21</span>
        </button>
      </div>
      <div className=""></div>
    </div>
  );
}
