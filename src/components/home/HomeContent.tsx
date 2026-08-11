"use client"

import { motion, MotionConfig } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/components/home/animations"
import ProjectsPreview from "@/components/home/ProjectsPreview"
import QuickFacts from "@/components/home/QuickFacts"
import WorkPreview from "@/components/home/WorkPreview"
import { homeIntroConfig, skillsConfig } from "@/data/content"
import { ProjectProps, WorkItemProps } from "@/lib/types"
import { cn } from "@/lib/utils"

const heroProfile = {
  imageSrc: "/profile/harry-leon-portrait.jpg",
  imageAlt: "Portrait of Ha Thuc Quoc Hung",
  displayName: "Harry Leon",
  role: "Backend Java Developer",
}

const rotatingHeroTitles = ["Ha Thuc Quoc Hung", "Harry Leon", "Backend Java Developer"]

const typingSpeedMs = 70
const pauseAfterTypedMs = 1200
const pauseBeforeTypingMs = 250

interface HomeContentProps {
  work: WorkItemProps[]
  projects: ProjectProps[]
}

export default function HomeContent({ work, projects }: HomeContentProps) {
  const [activeHeroTitleIndex, setActiveHeroTitleIndex] = useState(0)
  const [typedHeroTitle, setTypedHeroTitle] = useState("")

  useEffect(() => {
    const currentTitle = rotatingHeroTitles[activeHeroTitleIndex]
    let timeoutId: ReturnType<typeof setTimeout> | number | undefined

    setTypedHeroTitle("")

    const typeCharacter = (characterIndex: number) => {
      if (characterIndex <= currentTitle.length) {
        setTypedHeroTitle(currentTitle.slice(0, characterIndex))
        timeoutId = window.setTimeout(() => typeCharacter(characterIndex + 1), typingSpeedMs)
        return
      }

      timeoutId = window.setTimeout(() => {
        setActiveHeroTitleIndex(currentIndex => (currentIndex + 1) % rotatingHeroTitles.length)
      }, pauseAfterTypedMs)
    }

    timeoutId = window.setTimeout(() => typeCharacter(1), pauseBeforeTypingMs)

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId)
      }
    }
  }, [activeHeroTitleIndex])

  return (
    <>
      <section className="px-4 max-w-5xl mx-auto">
        <div
          id="hero"
          className="mt-2 min-h-[calc(100vh-11rem)] grid items-center gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,0.8fr)]"
        >
          <div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="text-left"
            >
              <div className="mb-4 min-h-[4.5rem] sm:min-h-[5.5rem]">
                <h1 className="grid w-fit grid-cols-[auto_minmax(18ch,1fr)] items-baseline justify-start gap-2 whitespace-nowrap text-2xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  <span className="text-accent-700 dark:text-accent-300">Hi I&apos;m</span>
                  <span className="inline-flex min-w-[18ch] justify-start text-left">
                    <span>{typedHeroTitle}</span>
                    <span className="ml-0.5 inline-block h-[1em] w-[0.08em] translate-y-1 bg-accent-500 align-baseline animate-pulse" />
                  </span>
                </h1>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainerVariants}
                className="space-y-4 max-w-3xl ml-0"
              >
                {homeIntroConfig.introParagraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    variants={staggerItemVariants}
                    className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300 text-left"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mx-auto w-full max-w-sm [perspective:1600px]"
          >
            {/* Gradient border wrapper */}
            <div
              className={cn(
                "group relative aspect-[4/5] overflow-hidden rounded-3xl",
                "bg-gradient-to-br from-violet-500/60 via-purple-600/40 to-violet-400/50 p-[2px]",
                "shadow-[0_0_40px_rgba(139,92,246,0.15),0_0_80px_rgba(139,92,246,0.08)]",
                "transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(139,92,246,0.25),0_0_100px_rgba(139,92,246,0.12)]"
              )}
            >
              {/* Inner card */}
              <div className="relative h-full w-full overflow-hidden rounded-[calc(1.5rem-2px)] bg-zinc-950">
                {/* Decorative glow orbs */}
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-500/20 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="absolute -left-12 bottom-8 h-28 w-28 rounded-full bg-purple-400/15 blur-3xl"
                />

                {/* Light sheen overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_35%,transparent_65%,rgba(139,92,246,0.06))]" />

                <Image
                  src={heroProfile.imageSrc}
                  alt={heroProfile.imageAlt}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 420px, 90vw"
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          id="about"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.05 }}
        >
          <QuickFacts />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.1 }}
        >
          <WorkPreview work={work} />
        </motion.div>

        <motion.div
          id="projects"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.14 }}
        >
          <ProjectsPreview projects={projects} />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          id="skills"
          className="mt-20"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
            Technical Skills
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillsConfig.map(group => (
              <div
                key={group.category}
                className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{group.category}</h3>
                <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
                  {group.skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  )
}
