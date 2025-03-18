"use client";

import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useLoggedUser } from "@/Context/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => (
  <Suspense fallback={<p>Loading...</p>}>
    <LoginContent />
  </Suspense>
);

const LoginContent = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      router.replace(redirectPath); // ✅ Ensure redirect happens AFTER state updates
    }
  }, [loggedUser, router, redirectPath]);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    setSigningIn(true);
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) {
        toast.error(`${data.error}!`, { autoClose: 2000 });
        console.error("Login error:", data);
        return;
      }

      setLoggedUser(data.userInfo);
      setSigningIn(false);
    } catch (error) {
      console.error("Login failed", error);
      toast.error("Something went wrong! Please try again.");
    } finally {
      setSigningIn(false);
    }
  };

  return (
    <div>
      <HeaderSection />
      <form className="flex flex-col gap-2 p-3" onSubmit={handleLogin}>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <Link className="text-blue-600 self-end text-sm underline" href="#">
          forgot password
        </Link>
        <button
          type="submit"
          disabled={signingIn}
          className="bg-blue-600 p-2 text-white rounded"
        >
          Login
        </button>
        <ToastContainer position="top-right" />
      </form>
      <SocialLogin />
      <RegisterSection />
    </div>
  );
};

const HeaderSection = () => (
  <div className="h-[150px] bg-blue-600 p-2 flex flex-col gap-3 justify-center">
    <Link href="/" className="text-white underline">
      ↖ back
    </Link>
    <p className="tracking-tighter text-3xl text-white font-bold">
      Sign in to your <br /> Account
    </p>
    <p className="text-gray-200 text-sm">Sign in to your Account</p>
  </div>
);

const InputField = ({ label, type, name, value, onChange }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      required
      className="border p-2"
      value={value}
      onChange={onChange}
    />
  </>
);

const RegisterSection = () => (
  <p className="px-3 mt-4 text-center">
    Don't have an account?{" "}
    <Link href="/register" className="underline text-blue-600">
      Register
    </Link>
  </p>
);

const SocialLogin = () => (
  <div className="p-3 flex flex-col gap-4 items-center">
    <div className="flex items-center gap-1 my-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <p className="text-center font-semibold">Or continue with</p>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
    <button
      className="border-gray-300 border rounded-2xl w-fit py-2 px-7 text-gray-900 font-semibold flex items-center gap-1"
      onClick={() => signIn("google")}
    >
      <FaGoogle />
      Sign in with Google
    </button>
  </div>
);

export default LoginPage;
