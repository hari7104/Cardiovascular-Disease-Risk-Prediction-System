"use client";
import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import { useEffect, useState } from "react";

export default function Header({ setUser, user }) {
  const handleLogOut = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      {/* ✅ Fully Transparent Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <div
          className="
            max-w-6xl mx-auto 
            flex items-center justify-between 
            px-3 sm:px-6 md:px-8
            py-3 sm:py-5
            gap-2
          "
        >
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-3 shrink min-w-0">
            <motion.div
              className="relative flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="absolute w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-400/20 blur-md" />
              <HeartPulse size={0} className="text-amber-400 sm:size-12" />
            </motion.div>

            <div className="flex flex-col leading-tight truncate">
              <h1
                className="
                  text-sm xs:text-base sm:text-lg md:text-3xl
                  font-semibold 
                  text-neutral-900 dark:text-white 
                  tracking-tight truncate
                "
              >
                CVD Risk Predictor
              </h1>
              <p className="text-[15px] xs:text-xs text-neutral-600 dark:text-neutral-400 truncate">
                Stay Healthy ❤️
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <button
                onClick={handleLogOut}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/70 dark:bg-red-500/80 border border-black/5 dark:border-white/10 text-sm hover:bg-white/90 dark:hover:bg-white/20 transition-all duration-100 hover:duration-150 hover:transition-all"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      </header>

      {/* Space below header */}
      <div className="pt-[75px] sm:pt-[85px]" />
    </>
  );
}
