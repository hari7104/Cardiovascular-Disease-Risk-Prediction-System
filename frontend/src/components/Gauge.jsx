import { motion } from 'framer-motion'

const SIZE = 220
const STROKE = 14
const R = (SIZE - STROKE) / 2
const CIRC = 2 * Math.PI * R

function color(prob) {
  if (prob <= 0.3) return 'text-success'
  if (prob <= 0.6) return 'text-warning'
  return 'text-danger'
}

function label(prob) {
  if (prob <= 0.3) return 'Low Risk'
  if (prob <= 0.6) return 'Moderate Risk'
  return 'High Risk'
}

export default function Gauge({ probability }) {
  const p = Math.max(0, Math.min(1, probability || 0))
  const dash = p * CIRC

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={SIZE} height={SIZE} className="rotate-[-90deg]">
        <circle cx={SIZE/2} cy={SIZE/2} r={R} fill="none" stroke="#e5e7eb" className="dark:stroke-gray-700" strokeWidth={STROKE} />
        <motion.circle
          cx={SIZE/2}
          cy={SIZE/2}
          r={R}
          fill="none"
          className={`stroke-current ${color(p)}`}
          strokeWidth={STROKE}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${CIRC}` }}
          animate={{ strokeDasharray: `${dash} ${CIRC}` }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-5xl font-bold">{Math.round(p * 100)}%</div>
        <div className="mt-2 text-sm opacity-80">{label(p)}</div>
      </div>
    </div>
  )
}


