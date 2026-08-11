"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { FaArrowRight } from "react-icons/fa"
import { useClickOutside } from "@/hooks/useClickOutside"
import { navItems } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  onClose: () => void
  onNavigate: (sectionId: string) => void
  activeSection: string
  isHome: boolean
}

/**
 * MobileMenu component that slides down from below the floating header.
 */
export default function MobileMenu({
  onClose,
  onNavigate,
  activeSection,
  isHome,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Close when clicking outside of the menu container
  useClickOutside(menuRef, onClose, { enabled: true, closeOnEscape: true })

  useEffect(() => {
    // Prevent background scroll when mobile menu is open
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "fixed left-4 right-4 z-40 top-20",
        "rounded-2xl p-5 border border-white/10",
        "bg-[rgba(8,8,13,0.95)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
        "md:hidden"
      )}
    >
      <ul className="flex flex-col gap-2">
        {navItems.map(({ name, sectionId }) => {
          const isActive = isHome && activeSection === sectionId
          return (
            <li key={sectionId}>
              <button
                onClick={() => onNavigate(sectionId)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 cursor-pointer",
                  isActive
                    ? "text-violet-300 bg-violet-500/10 border border-violet-500/20 shadow-[0_0_12px_rgba(139,92,246,0.1)]"
                    : "text-gray-400 border border-transparent hover:text-white hover:bg-white/5"
                )}
              >
                {name}
              </button>
            </li>
          )
        })}

        {/* Contact CTA in mobile menu */}
        <li className="mt-4 pt-4 border-t border-white/10">
          <Link
            href="/contact"
            onClick={onClose}
            className={cn(
              "flex w-full items-center justify-between px-4 py-3.5 rounded-xl",
              "text-base font-semibold text-white",
              "bg-gradient-to-r from-violet-600 to-purple-600",
              "border border-violet-500/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]",
              "transition-all duration-200 active:scale-[0.98]"
            )}
          >
            <span>Let&apos;s Talk</span>
            <FaArrowRight className="h-4 w-4" />
          </Link>
        </li>
      </ul>
    </motion.div>
  )
}
