"use client";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoggedUser } from "@/Context/userContext";
import { signIn } from "next-auth/react"; // Import signIn from next-auth

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setLoggedUser } = useLoggedUser(); //hook usage

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ fullName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      toast.error(`${data.error}!`, { autoClose: 2000 });
      return;
    }
    toast.success("Registration successful", { autoClose: 2000 });
    setLoggedUser(data.userInfo);

    router.push("/");
  };

  return (
    <div className="w-full flex flex-col gap-2 p-4">
      <ToastContainer position="top-right" />
      <p className="font-semibold text-2xl mb-5">Create an account</p>
      <p className="mb-4">
        Already have an account?{" "}
        <Link href={"/login"} className="underline">
          Login
        </Link>
      </p>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleRegister}>
        <input
          type="text"
          required
          placeholder="full name"
          className="bg-gray-100 p-2"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          required
          placeholder="Email"
          className="bg-gray-100 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Enter your password"
          className="bg-gray-100 p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          <input required type="checkbox" className="mr-2" />I agree to{" "}
          <Link href={"/terms"}>Terms & Conditions</Link>
        </p>
        <button type="submit" className="bg-blue-600 p-1 text-white mt-3">
          Create account
        </button>
      </form>
      <div className="flex flex-row gap-2 items-center mt-10">
        <div className="border flex-grow border-solid border-gray-400"></div>
        <p className="text-center font-semibold">Or register with</p>
        <div className="border flex-grow border-solid border-gray-400"></div>
      </div>
      {/* <button
        className="border border-gray-400 rounded-2xl w-fit py-1 px-5 text-gray-700 font-semibold mt-5"
        onClick={() => signIn("google")}
      >
        Sign up with Google
      </button> */}
    </div>
  );
};

export default RegisterPage;
