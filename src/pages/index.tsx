import Head from "next/head";
import { Poppins } from "next/font/google";
import { Play } from "lucide-react";
import Image from "next/image";
import OSImage from "../../public/OS-mobile.svg";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Hacklog - Track your progress</title>
        <meta
          name="description"
          content="Hacklog helps you log daily standups - reflect, plan, and ship faster."
        />
        <link
          rel="shortcut icon"
          href="../../public/favicon.ico"
          type="image/x-icon"
        />
      </Head>
      <main className="h-[calc(100vh-115px)] flex flex-col bg-gradient-to-br from-gray-200 to-green-200 pt-5">
        {" "}
        <div className="h- flex justify-center ">
          <div className="w-[85%] md:w-[60%] mt-[5%]">
            <h1
              className={`text-[28px] md:text-[50px] w-full ${poppins.className} text-center`}
            >
              Track your progress. Build consistently. Build better habit today.
            </h1>
            <p className=" text-[20px] w-full text-center px-[5%] md:px-[20%] mt-4">
              Hacklog helps markers and developers stay on track with daily
              standups. Track your daily routines, stay consistent, and turn
              goals into habits — all in one beautiful app.
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center mt-5 gap-4">
              <button
                type="button"
                className="text-center bg-green-600 px-10 py-5 text-white text-md center rounded-full hover:bg-green-500 border-green-600 border hover:cursor-pointer"
              >
                Get Started Free
              </button>
              <button
                type="button"
                className="flex flex-row items-center gap-1.5 text-green-600 border border-green-600 px-10 py-5  rounded-full hover:cursor-pointer"
              >
                <Play />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-end mt-10 md:mt-0">
          <Image
            src={OSImage}
            alt="os image for applictaion"
            width={200}
            height={200}
          />
        </div>
      </main>
    </>
  );
}
