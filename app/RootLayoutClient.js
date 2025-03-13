"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/Context/cartContext";
import { UserContextProvider } from "@/Context/userContext";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayoutClient({ children }) {
  return (
    <SessionProvider>
      <UserContextProvider>
        <CartProvider>
          <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-600 text-sm`}
          >
            {children}
          </div>
        </CartProvider>
      </UserContextProvider>
    </SessionProvider>
  );
}
