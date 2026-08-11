"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { FaArrowRight } from "react-icons/fa"
import MobileMenu from "@/components/MobileMenu"
import { navItems } from "@/lib/constants"
import { cn } from "@/lib/utils"

const SCROLL_THRESHOLD = 50

/**
 * Floating glass navbar for the portfolio landing page.
 * On the home page, nav items scroll to sections via IntersectionObserver.
 * On sub-pages, nav items link back to home page sections.
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const pathname = usePathname()
  const isHome = pathname === "/"
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  // ── Scroll state detection ───────────────────────────────────────────────

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ── Intersection Observer for active section ─────────────────────────────

  useEffect(() => {
    if (!isHome) return

    const sectionIds = navItems.map(item => item.sectionId)
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [isHome])

  // ── Smooth scroll handler ────────────────────────────────────────────────

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (!isHome) {
        // On sub-pages, navigate to home with hash
        window.location.href = `/#${sectionId}`
        return
      }

      const el = document.getElementById(sectionId)
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" })
        window.history.pushState(null, "", `#${sectionId}`)
      }
      setMobileMenuOpen(false)
    },
    [isHome]
  )

  // ── Hamburger icon ───────────────────────────────────────────────────────

  const hamburgerLine = "block h-0.5 w-5 rounded-full bg-gray-300 transition-all duration-300"

  return (
    <>
      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-[900px]",
          "rounded-[18px] px-5 py-3",
          "border transition-all duration-300",
          "pointer-events-auto",
          scrolled
            ? "bg-[rgba(11,11,18,0.85)] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-2xl"
            : "bg-[rgba(11,11,18,0.55)] border-white/[0.06] shadow-none backdrop-blur-xl"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          {/* ── Left: Logo ────────────────────────────────────────────── */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 shrink-0 group cursor-pointer"
            aria-label="Scroll to top"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-500" />
            </span>
            <span className="text-lg font-bold text-white tracking-tight group-hover:text-violet-300 transition-colors duration-200">
              Harry Leon<span className="text-violet-400">.</span>
            </span>
          </button>

          {/* ── Center: Desktop nav ───────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map(({ name, sectionId }) => {
              const isActive = isHome && activeSection === sectionId
              return (
                <button
                  key={sectionId}
                  onClick={() => scrollToSection(sectionId)}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-xl text-sm font-medium",
                    "transition-all duration-200 cursor-pointer",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
                    isActive
                      ? "text-violet-300 bg-violet-500/10 border border-violet-500/20 shadow-[0_0_12px_rgba(139,92,246,0.1)]"
                      : "text-gray-400 border border-transparent hover:text-white hover:-translate-y-px"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {name}
                  {/* Hover underline */}
                  {!isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-0 bg-violet-400 transition-all duration-300 group-hover:w-3/5" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* ── Right: CTA + Theme toggle + Mobile hamburger ──────────── */}
          <div className="flex items-center gap-2.5">
            {/* CTA: Let's Talk */}
            <Link
              href="/contact"
              className={cn(
                "hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl",
                "text-sm font-semibold text-white",
                "bg-gradient-to-r from-violet-600 to-purple-600",
                "border border-violet-500/30",
                "shadow-[0_0_20px_rgba(139,92,246,0.2)]",
                "transition-all duration-200",
                "hover:-translate-y-px hover:shadow-[0_0_28px_rgba(139,92,246,0.35)]",
                "active:scale-95"
              )}
            >
              Let&apos;s Talk
              <FaArrowRight className="h-3 w-3" />
            </Link>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              className={cn(
                "md:hidden flex flex-col items-center justify-center gap-1.5",
                "w-10 h-10 rounded-xl cursor-pointer",
                "border border-white/10 bg-white/5",
                "hover:bg-white/10 transition-all duration-200",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={cn(hamburgerLine, mobileMenuOpen && "translate-y-[4px] rotate-45")}
              />
              <span className={cn(hamburgerLine, mobileMenuOpen && "opacity-0 scale-0")} />
              <span
                className={cn(hamburgerLine, mobileMenuOpen && "-translate-y-[4px] -rotate-45")}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu overlay ──────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            onClose={() => setMobileMenuOpen(false)}
            onNavigate={scrollToSection}
            activeSection={activeSection}
            isHome={isHome}
            toggleRef={hamburgerRef}
          />
        )}
      </AnimatePresence>
    </>
  )
}
