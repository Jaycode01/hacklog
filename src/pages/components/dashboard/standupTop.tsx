import { FireSimple } from "phosphor-react";
import Styles from "../styles/dailyStandup.module.css";

export default function welcomeHeader() {
  return (
    <div>
      <p className="text-[16px] md:text-[18px] px-5 md:px-10 pt-5 italic font-semibold">
        You are on fire, keep working hard champ...
      </p>
      <div className="flex flex-col md:flex-row w-full justify-start md:justify-between px-5  md:px-10 py-7 items-start md:items-center gap-5">
        <h1
          className={`${Styles.pageHeader} text-[20px] md:text-[25px] font-semibold`}
        >
          Daily Standup - 05/07/2025
        </h1>
        <div className="flex items-center gap-5">
          <p className="border rounded border-gray-600 py-2.5 px-5 text-lg">
            <b>Status</b>: <span className="text-yellow-600">Pending</span>
          </p>
          <button
            type="button"
            className="flex items-center gap-1.5 bg-red-200 py-2.5 px-5 border-red-500 border rounded-lg"
          >
            <FireSimple size={20} className="text-red-500" />
            <span className="text-[20px] txt-gray-900 font-semibold">21</span>
          </button>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
