// src/components/ResultCard.jsx
import { motion } from "framer-motion";
import GaugeCircle from "./GaugeCircle.jsx";
import generateMedicalPDF from "./generateMedicalPDF.js";

export default function ResultCard({ result, onReset }) {
  if (!result) return null;

  const percent = Math.round(result.probability * 100);
  const riskLabel =
    percent > 65 ? "High Risk" :
    percent > 35 ? "Moderate Risk" :
    "Low Risk";

  const color =
    percent > 65 ? "text-red-500" :
    percent > 35 ? "text-amber-400" :
    "text-emerald-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl p-6 sm:p-8 backdrop-blur-lg bg-white/20 dark:bg-black/40 border border-white/30 shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

        {/* Gauge Mobile Centered */}
        <div className="flex justify-center order-1 md:order-none">
          <GaugeCircle probability={result.probability} size={170} />
        </div>

        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-xl font-semibold">
            Hey {result.fullName} 👋
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base"
          >
            Your cardiovascular risk report is ready ✅
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-3xl sm:text-4xl font-bold ${color}`}
          >
            {percent}% — {riskLabel}
          </motion.div>

          {/* Buttons → Full width on mobile */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              onClick={onReset}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 active:scale-95 transition"
            >
              Test Again
            </button>

            <button
              onClick={() => generateMedicalPDF(result)}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-500 text-black hover:bg-emerald-400 active:scale-95 transition"
            >
              Download Report
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
