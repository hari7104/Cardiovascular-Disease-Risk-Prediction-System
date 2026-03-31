import { Link, useNavigate } from "react-router-dom";
import { HeartPulse } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import useUser from "../hooks/useUser.jsx";
import { motion } from "framer-motion";

export function LandingNavbar() {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleScrollToHome = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToAbout = (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/70 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2" onClick={handleScrollToHome} role="button">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="absolute w-8 h-8 rounded-full bg-emerald-400/20 blur-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <HeartPulse className="text-emerald-500 w-8 h-8 relative z-10" />
          </motion.div>
          <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
            CVD Risk Predictor
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#home"
            onClick={handleScrollToHome}
            className="text-sm font-medium text-gray-600 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={handleScrollToAbout}
            className="text-sm font-medium text-gray-600 hover:text-emerald-500 dark:text-gray-300 dark:hover:text-emerald-400 transition-colors"
          >
            About Us
          </a>
        </nav>

        {/* Right Section / Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {user ? (
            <button
              onClick={() => navigate("/predict")}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-colors shadow-sm"
            >
              Dashboard
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black text-sm font-medium transition-colors shadow-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;
