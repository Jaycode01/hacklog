"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "@/firebase/firebaseClient";
import { useRouter } from "next/router";
import { Mail, User } from "lucide-react";
import { Password } from "phosphor-react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";

import Link from "next/link";
import Head from "next/head";

interface FirebaseAuthError extends Error {
  code: string;
}

export default function SignUp() {
  const router = useRouter();

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const getFirebaseErrorMessage = (code: string): string => {
    switch (code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/email-already-in-use":
        return "This email is already signed up to this app.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/missing-password":
        return "Please enter your password.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";
      case "auth/popup-closed-by-user":
        return "Open popup for sign up success.";
      case "auth/cancelled-popup-request":
        return "Popup signup was interrupted. Please try again.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userData.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        createdAt: new Date(),
      });

      await router.push("/dashboard");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "code" in err) {
        const firebaseError = err as FirebaseAuthError;
        seterror(getFirebaseErrorMessage(firebaseError.code));
      } else {
        seterror("Something went wrong. Please try again.");
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          provider: "google",
          createdAt: new Date(),
        });
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "code" in err) {
        const firebaseError = err as FirebaseAuthError;
        seterror(getFirebaseErrorMessage(firebaseError.code));
      } else {
        seterror("Something went wrong. Please try again.");
      }
    }
  };

  const signInWithGitHub = async () => {
    try {
      const result = await signInWithPopup(auth, new GithubAuthProvider());
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          provider: "github",
          createdAt: new Date(),
        });
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "code" in err) {
        const firebaseError = err as FirebaseAuthError;
        seterror(getFirebaseErrorMessage(firebaseError.code));
      } else {
        seterror("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Hacklog | Join Hacklog</title>
      </Head>
      <div className="relative flex flex-col justify-center items-center h-[calc(100vh-180px)]">
        {error && (
          <div className="absolute z-50 bottom-0 right-0 rounded-md  bg-red-200 mr-[10px] border border-red-500 py-3 px-5">
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          </div>
        )}
        <div className="w-[90%] md:w-[40%] ">
          <form
            action=""
            className="flex flex-col gap-5"
            onSubmit={handleSignUp}
          >
            <div className="flex flex-row gap-3 border border-gray-600 p-3 rounded">
              <label htmlFor="name" className="text-gray-600">
                <User />
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setname(e.target.value)}
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
                value={email}
                onChange={(e) => setemail(e.target.value)}
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
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="outline-none text-inherit w-full"
                placeholder="*********"
              />
            </div>
            <div className="w-full mt-6 flex flex-row justify-between gap-[5%]">
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-[47.5%] p-3 rounded text-center border border-gray-600 flex justify-center items-center gap-1.5 bg-white hover:bg-gray-50"
              >
                <FcGoogle />
                Google
              </button>
              <button
                type="button"
                onClick={signInWithGitHub}
                className="w-[47.5%] items-center p-3 rounded text-center border border-gray-600 flex justify-center gap-1.5 bg-white hover:bg-gray-50"
              >
                <FaGithub />
                GitHub
              </button>
            </div>
            <button
              type="submit"
              className="w-full p-3 cursor-pointer bg-green-600 text-white font-semibold rounded"
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
