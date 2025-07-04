import Head from "next/head";
import WelcomeHeader from "../components/dashboard/welcomeHeader";
import StatusCards from "../components/dashboard/statusCards";

export default function Dashboard() {
  return (
    <>
      <Head>Hacklog | Dashboard</Head>
      <div>
        <div className="bg-gray-50">
          <WelcomeHeader />
          <StatusCards />
        </div>
      </div>
    </>
  );
}
