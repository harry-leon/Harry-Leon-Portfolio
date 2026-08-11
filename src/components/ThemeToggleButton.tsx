"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import React, { useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { FaMoon, FaSun } from "react-icons/fa6"
import { cn } from "@/lib/utils"

/**
 * Runs `apply` inside a circular view-transition reveal centered at (x, y),
 * falling back to applying it immediately if the browser doesn't support the API.
 */
function runViewTransitionReveal(x: number, y: number, apply: () => void): Promise<void> {
  if (!document.startViewTransition) {
    apply()
    return Promise.resolve()
  }

  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = document.startViewTransition(() => {
    flushSync(apply)
  })

  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  })

  return transition.finished
}

/**
 * A simplified theme toggle button, sized exactly 38x38px, with no dropdown menus.
 * Toggles between light and dark themes using a circular ripple transition.
 */
export default function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          "w-[38px] h-[38px] rounded-xl border border-white/10 bg-white/5 animate-pulse"
        )}
      />
    )
  }

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark"

    const rect = event.currentTarget.getBoundingClientRect()
    const originX = rect.left + rect.width / 2
    const originY = rect.top + rect.height / 2

    runViewTransitionReveal(originX, originY, () => setTheme(nextTheme))
  }

  return (
    <button
      onClick={handleToggle}
      className={cn(
        "relative w-[38px] h-[38px] rounded-xl transition-all duration-200",
        "border border-white/10",
        "bg-white/5 hover:bg-white/10",
        "active:scale-95",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
        "flex items-center justify-center",
        "cursor-pointer shadow-sm hover:shadow-md"
      )}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={resolvedTheme}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
            mass: 0.5,
          }}
          className="absolute pointer-events-none"
        >
          {resolvedTheme === "dark" ? (
            <FaSun className="w-4 h-4 text-yellow-500" />
          ) : (
            <FaMoon className="w-4 h-4 text-gray-400" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}
