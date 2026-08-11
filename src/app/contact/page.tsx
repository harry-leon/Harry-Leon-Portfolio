import { Metadata } from "next"
import Link from "next/link"
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhone,
  FaRegUser,
} from "react-icons/fa"
import { homeIntroConfig } from "@/data/content"
import { cn } from "@/lib/utils"

const contactItems = [
  {
    label: "Email",
    value: "hquocthung.dev@gmail.com",
    href: "mailto:hquocthung.dev@gmail.com",
    icon: FaEnvelope,
  },
  {
    label: "Phone",
    value: "098-1641-622",
    href: "tel:0981641622",
    icon: FaPhone,
  },
  {
    label: "GitHub",
    value: "github.com/harry-leon",
    href: "https://github.com/harry-leon",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/harryleon",
    href: "https://www.linkedin.com/in/harryleon",
    icon: FaLinkedin,
  },
]

export const metadata: Metadata = {
  title: `Contact | ${homeIntroConfig.name}`,
  description:
    "Contact Ha Thuc Quoc Hung for backend Java roles, internship opportunities, or project collaboration.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${homeIntroConfig.name}`,
    description: "Reach out through email, phone, GitHub, LinkedIn, or the portfolio website.",
    type: "website",
  },
}

const panelClassName = cn(
  "rounded-[1.75rem] border border-white/10 bg-black/35 backdrop-blur-xl",
  "shadow-[0_0_0_1px_rgba(168,85,247,0.08),0_20px_80px_rgba(0,0,0,0.45)]"
)

const inputClassName = cn(
  "w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white",
  "placeholder:text-white/35 outline-none transition-colors duration-200",
  "focus:border-violet-400/60 focus:bg-black/45"
)

export default function ContactPage() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] text-white">
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        
        {/* Title above the grid */}
        <div className="max-w-3xl space-y-6 pt-4 sm:pt-6 mb-8 sm:mb-10">
          <h1 className="text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Let&apos;s build something impactful{" "}
            <span className="text-violet-400">together.</span>
          </h1>
        </div>

        {/* 2-column grid starting below the title */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          
          {/* Left Column: Message Form */}
          <div className={cn(panelClassName, "p-6 sm:p-7")}>
            <div className="mb-6 flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/12 text-violet-300">
                <FaEnvelope className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Send a message</h2>
                <p className="mt-2 text-base leading-7 text-white/65">
                  Have an opportunity or just want to say hi? I&apos;d love to hear from you.
                </p>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="sr-only">Your name</span>
                  <div className="relative">
                    <FaRegUser className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <input className={cn(inputClassName, "pl-11")} placeholder="Your name" />
                  </div>
                </label>
                <label className="block">
                  <span className="sr-only">Your email</span>
                  <div className="relative">
                    <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <input className={cn(inputClassName, "pl-11")} placeholder="Your email" />
                  </div>
                </label>
              </div>

              <label className="block">
                <span className="sr-only">Subject</span>
                <input className={inputClassName} placeholder="Subject" />
              </label>

              <label className="block">
                <span className="sr-only">Your message</span>
                <textarea
                  className={cn(inputClassName, "min-h-40 resize-none")}
                  placeholder="Your message"
                />
              </label>

              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-violet-400/40 bg-violet-500 px-6 py-3.5 text-base font-semibold text-white shadow-[0_0_24px_rgba(139,92,246,0.35)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-violet-400"
              >
                <FaPaperPlane className="h-4 w-4" />
                Send message
              </button>
            </form>
          </div>

          {/* Right Column: Contact Info Sidebar */}
          <aside className={cn(panelClassName, "p-6 sm:p-7")}>
            <div className="mb-6 flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/12 text-violet-300">
                <FaMapMarkerAlt className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-white">Contact information</h2>
                <p className="mt-2 text-base leading-7 text-white/65">
                  Direct ways to reach me for work opportunities and collaboration.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {contactItems.map(item => {
                const Icon = item.icon
                const content = (
                  <>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-400/12 bg-violet-500/10 text-violet-300">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white/55">{item.label}</p>
                      <p className="mt-1 break-words text-lg font-medium text-white/92">
                        {item.value}
                      </p>
                    </div>
                  </>
                )

                if (item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 rounded-2xl border border-white/7 bg-white/[0.03] p-3 transition-colors duration-200 hover:border-violet-400/25 hover:bg-white/[0.05]"
                    >
                      {content}
                    </Link>
                  )
                }

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl border border-white/7 bg-white/[0.03] p-3"
                  >
                    {content}
                  </div>
                )
              })}
            </div>
          </aside>

        </div>
      </div>
    </section>
  )
}
