import * as Dialog from '@radix-ui/react-dialog'
import { Info } from 'lucide-react'

export default function AboutModal() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/10 text-sm hover:bg-white/90 dark:hover:bg-white/20">
          <Info size={16} /> About
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg rounded-2xl bg-white dark:bg-gray-900 p-6 shadow-glass">
          <Dialog.Title className="text-lg font-semibold text-primary">About This Tool</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            This application uses an ONNX model (XGBoost) with standardized inputs to estimate cardiovascular disease risk. It is not a medical diagnosis.
          </Dialog.Description>
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-200 space-y-1">
            <p>Model: XGBoost (ONNX)</p>
            <p>Inputs: 13 clinical indicators</p>
            <p>Output: Probability and binary prediction</p>
          </div>
          <div className="mt-6 flex justify-end">
            <Dialog.Close asChild>
              <button className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90">Close</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}


