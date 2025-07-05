import Head from "next/head";
import WelcomeHeader from "../components/dashboard/welcomeHeader";
import StandupForm from "../components/dashboard/standupForm";

export default function Dashboard() {
  return (
    <>
      <Head>Hacklog | Dashboard</Head>
      <div>
        <div className="bg-gray-50">
          <WelcomeHeader />
          <StandupForm />
        </div>
      </div>
    </>
  );
}
