import Head from "next/head";
import TopComponent from "../components/history/topComponent";
import HistoryCards from "../components/history/historyCards";

export default function History() {
  return (
    <>
      <Head>
        <title>Hacklog | History</title>
      </Head>
      <div className="bg-gray-50">
        <TopComponent />
        <HistoryCards />
      </div>
    </>
  );
}
