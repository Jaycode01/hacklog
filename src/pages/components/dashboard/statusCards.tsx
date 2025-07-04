import { CheckCircle, Kanban } from "lucide-react";
import { FireSimple } from "phosphor-react";

export default function StatusCards() {
  return (
    <div className="p-7 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-white hover:scale-105 transition-all duration-500 shadow-md border border-gray-200 rounded p-4 flex flex-col gap-2">
        <CheckCircle className="text-yellow-500" size={35} />
        <p className="uppercase font-semibold text-[18px] text-gray-700">
          Total Standups
        </p>
      </div>
      <div className="bg-white hover:scale-105 transition-all duration-500 shadow-md border border-gray-200 rounded p-4 flex flex-col gap-2">
        <Kanban size={35} className="text-blue-500" />
        <p className="uppercase font-semibold text-[18px] text-gray-700">
          Tasks Completed Today
        </p>
      </div>
      <div className="bg-white p-4 shadow-md border border-gray-200 rounded flex flex-col gap-2">
        <FireSimple className="text-red-500" size={35} />
        <p className="txet-[18px] font-semibold uppercase text-gray-700">
          Streaks
        </p>
      </div>
    </div>
  );
}
