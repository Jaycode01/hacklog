import Head from "next/head";
import { useState } from "react";
import TopComponent from "../components/history/topComponent";
import HistoryCards from "../components/history/historyCards";

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Head>
        <title>Hacklog | History</title>
      </Head>
      <div className="bg-gray-50">
        <TopComponent
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <HistoryCards searchQuery={searchQuery} />
      </div>
    </>
  );
}
