import Navbar from "./navbar";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Hacklog - Work with consistency</title>
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
