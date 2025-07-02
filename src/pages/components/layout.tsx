import Navbar from "./navbar";
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>Hacklog - Work with consistency</Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
