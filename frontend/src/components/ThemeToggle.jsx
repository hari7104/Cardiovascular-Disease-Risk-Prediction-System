import { useEffect, useState } from 'react'
import { SunMedium, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button onClick={toggle} aria-label="Toggle theme" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/10 text-sm hover:bg-white/90 dark:hover:bg-white/20">
      {dark ? <SunMedium size={16} /> : <Moon size={16} />}
      <span>{dark ? 'Light' : 'Dark'}</span>
    </button>
  )
}


