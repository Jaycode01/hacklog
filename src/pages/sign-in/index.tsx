import { Mail } from "lucide-react";
import Head from "next/head";
import { Password } from "phosphor-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function LogIn() {
  return (
    <>
      <Head>
        <title>Hacklog | Sign In</title>
        <meta
          name="description"
          content="Sign in and continue to use ahcklog to stay productive and accountable."
        />
      </Head>
      <div className="flex flex-col justify-center items-center mt-[10%]  w-full">
        <div className="w-[40%]">
          <form action="" className="flex flex-col gap-5">
            <div className="flex flex-row gap-3 p-3 rounded border border-gray-600">
              <label htmlFor="email" className="text-gray-600">
                <Mail />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="tom.keen@dev.com"
                className="outline-none text-inherit w-full"
              />
            </div>
            <div className="flex flex-row gap-3 p-3 border border-gray-600 rounded">
              <label htmlFor="password" className="text-gray-600">
                <Password size={25} />
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full outline-none text-inherit"
                placeholder="**********"
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
              className="text-center font-semibold text-white bg-blue-500 p-3 rounded"
            >
              Sign In
            </button>
          </form>
          <div className="mt-5">
            Not a user yet?{" "}
            <Link
              href="/get-started"
              className="text-blue-600 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
