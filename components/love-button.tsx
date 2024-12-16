"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { FloatingHeart } from "./floating-heart";

export default function LoveButton() {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setHearts((prevHearts) => [...prevHearts, { id: Date.now(), x, y }]);

    // Remove the heart after 2 seconds
    setTimeout(() => {
      setHearts((prevHearts) => prevHearts.slice(1));
    }, 2000);
  };

  return (
    <>
      <AnimatePresence>
        {hearts.map((heart) => (
          <FloatingHeart key={heart.id} x={heart.x} y={heart.y} />
        ))}
      </AnimatePresence>
      <button
        onClick={handleClick}
        className="flex p-3 items-center gap-2 text-pink-500 transition-colors duration-300 bg-white rounded-full shadow-lg hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-300"
        aria-label="Love"
      >
        <Heart className="w-6 h-6 fill-current" /> Click this button
      </button>
    </>
  );
}
