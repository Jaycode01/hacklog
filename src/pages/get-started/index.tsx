import { Mail, User } from "lucide-react";
import { Password } from "phosphor-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Head from "next/head";

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Hacklog | Join Hacklog</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-100vh">
        <div className="w-[80%] md:w-[40%] mt-[10%]">
          <form action="" className="flex flex-col gap-5">
            <div className="flex flex-row gap-3 border border-gray-600 p-3 rounded">
              <label htmlFor="name" className="text-gray-600">
                <User />
              </label>
              <input
                type="text"
                className="outline-none text-inherit w-full"
                placeholder="Tom Keen"
              />
            </div>
            <div className="flex flex-row gap-3 border border-gray-600 p-3 rounded">
              <label htmlFor="email" className="text-gray-600">
                <Mail />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="outline-none w-full text-inherit"
                placeholder="tom.keen@dev.com"
              />
            </div>
            <div className="flex flex-row gap-3 border border-gray-600 p-3 rounded">
              <label htmlFor="password" className="text-gray-600">
                <Password size={25} />
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="outline-none text-inherit w-full"
                placeholder="*********"
              />
            </div>
            <div className="w-full mt-6 flex flex-row justify-between gap-[5%]">
              <button
                type="button"
                className="w-[47.5%] p-3 rounded text-center border border-gray-600 flex justify-center items-center gap-1.5 bg-white hover:bg-gray-50"
              >
                <FcGoogle />
                Google
              </button>
              <button
                type="button"
                className="w-[47.5%] items-center p-3 rounded text-center border border-gray-600 flex justify-center gap-1.5 bg-white hover:bg-gray-50"
              >
                <FaGithub />
                GitHub
              </button>
            </div>
            <button
              type="submit"
              className="w-full p-3 cursor-pointer bg-blue-500 text-white font-semibold rounded"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-5 text-[17px]">
            Have an account already?{" "}
            <Link
              href="/sign-in"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
