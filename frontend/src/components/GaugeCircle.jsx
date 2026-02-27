import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const R = 100;
const STROKE = 12;
const SIZE = 2 * (R + STROKE);
const CIRC = 2 * Math.PI * R;

function color(prob) {
  if (prob <= 0.35) return "#22C55E"; // Green
  if (prob <= 0.65) return "#FACC15"; // Amber
  return "#DC2626"; // Red
}

export default function GaugeCircle({ probability = 0 }) {
  const clamped = Math.max(0, Math.min(1, probability));
  const dashMv = useMotionValue(0);
  const dashStr = useTransform(dashMv, (v) => `${v} ${CIRC}`);
  const display = useMotionValue(0);

  useEffect(() => {
    const controls1 = animate(dashMv, clamped * CIRC, {
      duration: 1.2,
      ease: "easeInOut",
    });
    const controls2 = animate(display, clamped * 100, {
      duration: 1.0,
      ease: "easeOut",
    });
    return () => {
      controls1.stop();
      controls2.stop();
    };
  }, [clamped]);

  const percent = useTransform(display, (v) => `${Math.round(v)}%`);

  return (
    <div className="relative flex items-center justify-center">
      <svg width={SIZE} height={SIZE} className="[filter:url(#glow)]">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="#E5E7EB"
          className="dark:stroke-gray-700"
          strokeWidth={STROKE}
        />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          style={{ strokeDasharray: dashStr }}
        />
      </svg>
      <div className="absolute text-center">
        <motion.div
          className="text-3xl font-bold"
          style={{ color: color(clamped) }}
        >
          {percent}
        </motion.div>
        <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">
          {clamped <= 0.35
            ? "Low Risk"
            : clamped <= 0.65
            ? "Moderate Risk"
            : "High Risk"}
        </div>
      </div>
    </div>
  );
}
