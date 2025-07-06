import Head from "next/head";
import { useState } from "react";
import TopComponent from "../components/history/topComponent";
import HistoryCards from "../components/history/historyCards";

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setfilterOption] = useState("All");

  return (
    <>
      <Head>
        <title>Hacklog | History</title>
      </Head>
      <div className="bg-gray-50">
        <TopComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilterChange={setfilterOption}
        />
        <HistoryCards searchQuery={searchQuery} filterOption={filterOption} />
      </div>
    </>
  );
}
