import { motion } from 'framer-motion'

export default function Stepper({ step, total = 3 }) {
  const pct = Math.min(100, Math.max(0, ((step - 1) / (total - 1)) * 100))
  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
        <span>Step {step} of {total}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-300 to-yellow-500"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}


