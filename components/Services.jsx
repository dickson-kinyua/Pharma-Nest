"use client";

import Link from "next/link";
import { useState } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

const Services = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordResetForm, setPassworddResetForm] = useState(false);
  const [error, setError] = useState(null);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const formData = { oldPassword, newPassword };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/changePassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        console.log(data.error);
        throw new Error("Failed to update password");
      }
      setError(null);
      console.log(data.message);
    } catch (error) {
      console.error("Could not update password", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-white p-2 w-full">
      <p className="font-semibold">My Services</p>
      <div className="flex justify-between">
        <Link href={"#"}>Address</Link>
        <button onClick={() => setPassworddResetForm(!passwordResetForm)}>
          Change password
        </button>
        <Link href={"#"}>Customer Service</Link>
      </div>
      {passwordResetForm && (
        <ResetPasswordForm
          oldPassword={oldPassword}
          setOldPassword={setOldPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          error={error}
          setError={setError}
          setConfirmPassword={setConfirmPassword}
          onChangePassword={handlePasswordChange}
        />
      )}
    </div>
  );
};

export default Services;
