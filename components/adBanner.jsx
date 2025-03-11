"use client";

import { useState } from "react";

const AdBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      className={`w-full bg-blue-500 text-white text-center py-3 px-4 shadow-lg transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "hidden"
      }`}
    >
      <p className="animate-pulse">
        🔥 Limited Time Offer! Get 20% Off on All Products! 🔥
      </p>
      {/* <button
        className="absolute right-4 top-2 text-white text-xl"
        onClick={() => setIsVisible(false)}
      >
        ✖
      </button> */}
    </div>
  );
};

export default AdBanner;
