import Head from "next/head";
import StandupTop from "../components/dashboard/standupTop";
import StandupForm from "../components/dashboard/standupForm";
import ErrorBoundary from "../components/dashboard/ErrorBoundary";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Hacklog | Dashboard</title>
      </Head>
      <div>
        <div className="bg-gray-50 min-h-screen">
          <ErrorBoundary>
            <StandupTop />
            <StandupForm />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
}
