"use client";

import { Mail } from "lucide-react";
import { Password } from "phosphor-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";
import { useRouter } from "next/router";

import Head from "next/head";
import Link from "next/link";

export default function LogIn() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        seterror(err.message);
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        seterror(err.message);
      }
    }
  };

  const loginWithGithub = async () => {
    try {
      await signInWithPopup(auth, new GithubAuthProvider());
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        seterror(err.message);
      }
    }
  };

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
          <form
            action=""
            onSubmit={handleLogin}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-row gap-3 p-3 rounded border border-gray-600">
              <label htmlFor="email" className="text-gray-600">
                <Mail />
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
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
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="w-full outline-none text-inherit"
                placeholder="**********"
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
            <button
              type="submit"
              className="text-center font-semibold text-white bg-blue-500 p-3 rounded"
            >
              Sign In
            </button>
            <div className="w-full mt-6 flex flex-row justify-between gap-[5%]">
              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-[47.5%] p-3 rounded text-center border border-gray-600 flex justify-center items-center gap-1.5 bg-white hover:bg-gray-50"
              >
                <FcGoogle />
                Google
              </button>
              <button
                type="button"
                onClick={loginWithGithub}
                className="w-[47.5%] items-center p-3 rounded text-center border border-gray-600 flex justify-center gap-1.5 bg-white hover:bg-gray-50"
              >
                <FaGithub />
                GitHub
              </button>
            </div>
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
