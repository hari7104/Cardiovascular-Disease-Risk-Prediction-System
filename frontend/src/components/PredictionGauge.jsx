import { motion } from 'framer-motion'

const SIZE = 200
const STROKE = 14
const R = (SIZE - STROKE) / 2
const CIRC = 2 * Math.PI * R

function getColor(prob) {
  if (prob <= 0.3) return 'text-green-400'
  if (prob <= 0.6) return 'text-yellow-400'
  return 'text-red-500'
}

function getLabel(prob) {
  if (prob <= 0.3) return 'Low Risk'
  if (prob <= 0.6) return 'Moderate Risk'
  return 'High Risk'
}

export default function PredictionGauge({ probability }) {
  const pct = Math.max(0, Math.min(1, probability))
  const dash = pct * CIRC
  const color = getColor(pct)

  return (
    <div className="flex flex-col items-center">
      <svg width={SIZE} height={SIZE} className="rotate-[-90deg]">
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          stroke="#1f2937"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={R}
          fill="none"
          className="stroke-current"
          strokeWidth={STROKE}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${CIRC}` }}
          animate={{ strokeDasharray: `${dash} ${CIRC}` }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{ color: 'currentColor' }}
        />
      </svg>
      <div className={`-mt-40 text-center ${color}`}>
        <div className="text-5xl font-bold">{Math.round(pct * 100)}%</div>
        <div className="mt-2 text-lg opacity-80">{getLabel(pct)}</div>
      </div>
    </div>
  )
}


