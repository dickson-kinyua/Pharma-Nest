"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useLoggedUser } from "@/Context/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <LoginContent />
    </Suspense>
  );
};

const LoginContent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/"; // Default to home if no redirect

  useEffect(() => {
    if (loggedUser) {
      router.push(redirectPath); // Redirect user after login
    }
  }, [loggedUser, router, redirectPath]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(`${data.error}!`, { autoClose: 2000 });
        return;
      }
      setLoggedUser(data.userInfo);
      router.push(redirectPath); //Redirect after login
      console.log(data.userInfo);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <div className="h-[150px] bg-blue-600 p-2 flex flex-col gap-3 justify-center">
        <Link href={"/"} className="text-white underline">
          ↖ back
        </Link>

        <p className="tracking-tighter text-3xl text-white font-bold">
          Sign in to your <br /> Account
        </p>
        <p className="text-gray-200 text-sm">Sign in to your Account</p>
      </div>
      <form className="flex flex-col gap-2 p-3" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          required
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          required
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link className="text-blue-600 self-end" href={"#"}>
          Forgot Password?
        </Link>
        <button type="submit" className="bg-blue-600 p-2 text-white rounded">
          Login
        </button>
        <ToastContainer position="top-right" />
      </form>
      <p className="px-3">
        Don't have an account?{" "}
        <Link href={"/register"} className="underline text-blue-600 ">
          Register
        </Link>
      </p>
      <div className="p-3 flex flex-col gap-4">
        <div className="flex items-center gap-1 my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <p className="text-center font-semibold">Or continue with</p>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <button
          className="border-gray-300 border-solid  border rounded-2xl w-fit py-1 px-7 text-gray-900 font-semibold"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
