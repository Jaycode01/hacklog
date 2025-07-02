import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./components/layout";
import { Comic_Neue } from "next/font/google";

const comicneue = Comic_Neue({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={comicneue.className}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
