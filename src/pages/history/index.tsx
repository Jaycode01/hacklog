import Head from "next/head";
import TopComponent from "../components/history/topComponent";

export default function History() {
  return (
    <>
      <Head>
        <title>Hacklog | History</title>
      </Head>
      <div className="bg-gray-50">
        <TopComponent />
      </div>
    </>
  );
}
