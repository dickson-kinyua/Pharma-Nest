"use client";

import { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";

const AdBanner = () => {
  const images = [
    { img: "animate/images (1).jpeg", message: "Need meds?Skip the queues" },
    { img: "animate/images (2).jpeg", message: "Your health,our priority" },
    { img: "animate/images (3).jpeg", message: "Trusted pharmacy" },
    { img: "animate/images (4).jpeg", message: "Health made easy" },
    {
      img: "animate/images (5).jpeg",
      message: "Stay healthy,stay stress free",
    },
  ];

  const [isVisible, setIsVisible] = useState(true);
  const [image, setImage] = useState(images[0].img);
  const [message, setMessage] = useState(images[0].message);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setImage(images[index].img);
      setMessage(images[index].message);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-0  w-full bg-blue-500 text-white py-[1px] md:py-4 px-1 flex justify-between">
      <p className="text-sm leading-4 font-semibold  flex flex-col items-center">
        <span className="tracking-tight uppercase text-xl md:text-3xl font-extrabold">
          One-Stop
        </span>{" "}
        <span className="text-sm md:text-xl tracking-wider">Health Shop!</span>
      </p>
      <p className="flex flex-col md:gap-2 items-center">
        <span className="animate-pulse  md:text-3xl">
          Call or WhatsApp to order
        </span>
        <span className="font-bold text-xl flex gap-1 md:gap-2 items-center md:text-3xl">
          <FaPhone className="rotate-[90deg]" /> 0745133665
        </span>
      </p>
    </div>
  );
};

export default AdBanner;
