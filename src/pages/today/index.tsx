import Head from "next/head";
import StandupTop from "../components/dashboard/standupTop";
import StandupForm from "../components/dashboard/standupForm";

export default function Dashboard() {
  return (
    <>
      <Head>Hacklog | Dashboard</Head>
      <div>
        <div className="bg-gray-50">
          <StandupTop />
          <StandupForm />
        </div>
      </div>
    </>
  );
}
