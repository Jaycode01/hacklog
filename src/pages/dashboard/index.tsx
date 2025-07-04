import Head from "next/head";
import WelcomeHeader from "../components/dashboard/welcomeHeader";

export default function Dashboard() {
  return (
    <>
      <Head>Hacklog | Dashboard</Head>
      <div>
        <div className="">
          <WelcomeHeader />
        </div>
      </div>
    </>
  );
}
