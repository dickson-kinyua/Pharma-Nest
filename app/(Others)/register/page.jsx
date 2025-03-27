"use client";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoggedUser } from "@/Context/userContext";
import { signIn } from "next-auth/react"; // Import signIn from next-auth
import { FaGoogle } from "react-icons/fa";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setLoggedUser } = useLoggedUser(); //hook usage

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({ fullName, email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );

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
    <div className="w-full flex flex-col">
      <ToastContainer position="top-right" />
      <div className="bg-blue-600 flex flex-col gap-3 p-2 justify-center">
        <Link href="/" className="text-white underline">
          ↖ back
        </Link>
        <p className="tracking-tighter text-2xl text-white font-bold">
          Welcome to <br /> PharmaNest
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <div className="sm:w-full">
          <p className="my-4 mx-3">
            Already have an account?{" "}
            <Link href={"/login"} className="underline">
              Login
            </Link>
          </p>
          <form className="flex flex-col gap-2 mx-3" onSubmit={handleRegister}>
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
            {/* <p>
          <input type="checkbox" defaultChecked className="mr-2" />I agree to{" "}
          <Link href={"/terms"}>Terms & Conditions</Link>
        </p> */}
            <button
              type="submit"
              className="bg-blue-600 p-2 rounded-2xl text-white mt-3 sm:w-fit"
            >
              Create account
            </button>
          </form>
        </div>

        <div className="sm:w-full">
          <div className="flex flex-row sm:justify-center gap-2 items-center mt-10 mx-3">
            <div className="border flex-grow border-solid border-gray-400 sm:hidden"></div>
            <p className="text-center font-semibold">Or continue with</p>
            <div className="border flex-grow border-solid border-gray-400 sm:hidden"></div>
          </div>
          <button
            className="border border-gray-400 rounded-2xl mx-auto w-fit py-2 px-5 text-gray-700 font-semibold mt-5 flex items-center gap-1"
            onClick={() => signIn("google")}
          >
            <FaGoogle />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
