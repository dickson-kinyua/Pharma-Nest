"use client";

import { useEffect, useState } from "react";

export default function AddressForm() {
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (data.success) {
      alert("Address added successfully!");
    } else {
      alert("Error: " + data.error);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const res = await fetch("/api/address", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) {
        const errorMessage = await res.json();
        console.log(errorMessage);
        return;
      }

      const data = await res.json();
      console.log(data);
    };
    fetchAddress();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border w-4/5 absolute top-4 rounded shadow-md z-40 text-white bg-black flex flex-col gap-2"
    >
      <input
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
        required
        className="p-2 text-gray-700"
      />
      <input
        name="phoneNumber"
        placeholder="Phone Number"
        onChange={handleChange}
        required
        className="p-2 text-gray-700"
      />
      <input
        name="streetAddress"
        placeholder="Street Address"
        onChange={handleChange}
        required
        className="p-2 text-gray-700"
      />
      <input
        name="city"
        placeholder="City"
        onChange={handleChange}
        required
        className="p-2 text-gray-700"
      />
      <input
        name="postalCode"
        placeholder="Postal Code"
        onChange={handleChange}
        required
        className="p-2 text-gray-700"
      />
      <input
        name="country"
        placeholder="Country"
        onChange={handleChange}
        required
        className="p-2 text-gray-700"
      />
      <button type="submit" className="btn-primary">
        Save Address
      </button>
    </form>
  );
}
