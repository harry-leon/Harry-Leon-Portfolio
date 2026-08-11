"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

// ─── Constants ───────────────────────────────────────────────────────────────

const PURPLE_NEON = {
  blob1: "rgba(139, 92, 246, 0.15)",
  blob2: "rgba(124, 58, 237, 0.12)",
  blob3: "rgba(167, 139, 250, 0.10)",
  particle: "rgba(167, 139, 250, ALPHA)",
  cursorGlow: "rgba(139, 92, 246, 0.08)",
  networkLine: "rgba(139, 92, 246, ALPHA)",
}

const PARTICLE_COUNTS = { desktop: 35, tablet: 20, mobile: 15 } as const
const NETWORK_MAX_DISTANCE = 150
const CURSOR_LERP_FACTOR = 0.08
const MAX_DPR = 2

// ─── Types ───────────────────────────────────────────────────────────────────

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  glowPhase: number
  glowSpeed: number
  opacity: number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getParticleCount(width: number): number {
  if (width < 768) return PARTICLE_COUNTS.mobile
  if (width < 1024) return PARTICLE_COUNTS.tablet
  return PARTICLE_COUNTS.desktop
}

function isMobile(width: number): boolean {
  return width < 768
}

function createParticles(count: number, w: number, h: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: 1 + Math.random() * 1.5,
    speed: 0.08 + Math.random() * 0.15,
    glowPhase: Math.random() * Math.PI * 2,
    glowSpeed: 0.008 + Math.random() * 0.012,
    opacity: 0.2 + Math.random() * 0.4,
  }))
}

function drawParticleSystem(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  w: number,
  h: number,
  reducedMotion: boolean
) {
  ctx.clearRect(0, 0, w, h)

  for (const p of particles) {
    if (!reducedMotion) {
      p.y += p.speed
      if (p.y > h + 10) {
        p.y = -10
        p.x = Math.random() * w
      }
      p.glowPhase += p.glowSpeed
      p.opacity = 0.15 + Math.sin(p.glowPhase) * 0.3
    }

    const alpha = Math.max(0.05, Math.min(0.6, p.opacity))

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = PURPLE_NEON.particle.replace("ALPHA", alpha.toFixed(3))
    ctx.fill()

    if (alpha > 0.4) {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
      gradient.addColorStop(0, PURPLE_NEON.particle.replace("ALPHA", "0.25"))
      gradient.addColorStop(1, "transparent")
      ctx.fillStyle = gradient
      ctx.fill()
    }
  }

  if (!reducedMotion) {
    ctx.lineWidth = 0.5
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < NETWORK_MAX_DISTANCE) {
          const lineAlpha = (1 - dist / NETWORK_MAX_DISTANCE) * 0.06
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = PURPLE_NEON.networkLine.replace("ALPHA", lineAlpha.toFixed(4))
          ctx.stroke()
        }
      }
    }
  }
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, smoothX: 0, smoothY: 0 })
  const rafRef = useRef<number>(0)
  const particlesRef = useRef<Particle[]>([])
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  // ─── Canvas lifecycle ────────────────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    function setupCanvas() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      const w = window.innerWidth
      const h = window.innerHeight

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const ctx = canvas.getContext("2d")
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      particlesRef.current = createParticles(getParticleCount(w), w, h)
    }

    function tick() {
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const ctx = canvas!.getContext("2d")
      if (!ctx) return

      const w = window.innerWidth
      const h = window.innerHeight
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      // Smooth cursor lerp
      const mouse = mouseRef.current
      mouse.smoothX += (mouse.x - mouse.smoothX) * CURSOR_LERP_FACTOR
      mouse.smoothY += (mouse.y - mouse.smoothY) * CURSOR_LERP_FACTOR

      drawParticleSystem(ctx, particlesRef.current, w, h, reducedMotion)

      rafRef.current = requestAnimationFrame(tick)
    }

    setupCanvas()
    rafRef.current = requestAnimationFrame(tick)

    const handleResize = () => setupCanvas()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Mouse tracking (desktop only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile(window.innerWidth)) return
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // ─── Render ──────────────────────────────────────────────────────────────

  const isDark = mounted && resolvedTheme === "dark"

  if (mounted && !isDark) return null

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Layer 1: Base background */}
      <div className="absolute inset-0 bg-[#09090f]" />

      {/* Layer 1b: Grid pattern overlay */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)]",
          "bg-[size:48px_48px]"
        )}
      />

      {/* Layer 2: Animated gradient blobs */}
      <div
        className="anim-bg-blob-1 absolute -top-[20%] -left-[10%] h-[60vh] w-[60vh] rounded-full will-change-transform"
        style={{
          background: `radial-gradient(circle, ${PURPLE_NEON.blob1}, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />
      <div
        className="anim-bg-blob-2 absolute -bottom-[15%] -right-[15%] h-[55vh] w-[55vh] rounded-full will-change-transform"
        style={{
          background: `radial-gradient(circle, ${PURPLE_NEON.blob2}, transparent 70%)`,
          filter: "blur(90px)",
        }}
      />
      <div
        className="anim-bg-blob-3 absolute top-[40%] left-[50%] h-[40vh] w-[40vh] -translate-x-1/2 rounded-full will-change-transform"
        style={{
          background: `radial-gradient(circle, ${PURPLE_NEON.blob3}, transparent 70%)`,
          filter: "blur(70px)",
        }}
      />

      {/* Layer 3: Canvas particles + network lines */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Layer 4: Cursor radial glow (desktop only) */}
      <CursorGlow mouseRef={mouseRef} mounted={mounted} />
    </div>
  )
}

// ─── Cursor Glow sub-component ─────────────────────────────────────────────

interface CursorGlowProps {
  mouseRef: React.RefObject<{
    x: number
    y: number
    smoothX: number
    smoothY: number
  }>
  mounted: boolean
}

function CursorGlow({ mouseRef, mounted }: CursorGlowProps) {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mounted) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) return

    let localSmoothX = 0
    let localSmoothY = 0
    let raf = 0

    function animateGlow() {
      if (isMobile(window.innerWidth) || !glowRef.current || !mouseRef.current) {
        raf = requestAnimationFrame(animateGlow)
        return
      }

      const mouse = mouseRef.current
      localSmoothX += (mouse.x - localSmoothX) * CURSOR_LERP_FACTOR
      localSmoothY += (mouse.y - localSmoothY) * CURSOR_LERP_FACTOR

      glowRef.current.style.transform = `translate3d(${localSmoothX - 200}px, ${localSmoothY - 200}px, 0)`
      glowRef.current.style.opacity = mouse.x === 0 && mouse.y === 0 ? "0" : "1"

      raf = requestAnimationFrame(animateGlow)
    }

    raf = requestAnimationFrame(animateGlow)

    return () => cancelAnimationFrame(raf)
  }, [mounted, mouseRef])

  return (
    <div
      ref={glowRef}
      className="absolute hidden md:block h-[400px] w-[400px] rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background: `radial-gradient(circle, ${PURPLE_NEON.cursorGlow}, transparent 70%)`,
        willChange: "transform",
      }}
    />
  )
}
