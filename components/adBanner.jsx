"use client";

import { useEffect, useState } from "react";

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
    <div className="w-full bg-blue-500 text-white">
      <div
        className={`text-center py-3 px-4 shadow-lg transition-all duration-100 ${
          isVisible ? "opacity-500 translate-y-0" : "hidden"
        }`}
      >
        <p className="animate-pulse text-sm">
          🔥Special Deal! Free Shipping on all Orders!🔥
        </p>
      </div>
      {/* <div className="text-sm p-2 flex flex-row justify-between">
        <p className="self-center text-center">{message}</p>
        <img className="w-1/2 h-20" src={image} alt="pic" />
      </div> */}
    </div>
  );
};

export default AdBanner;
