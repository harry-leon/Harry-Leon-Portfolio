import { Metadata } from "next"
import Link from "next/link"
import { FaEnvelope, FaGithub, FaGlobe, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa"
import { homeIntroConfig } from "@/data/content"

const contactItems = [
  {
    label: "Email",
    value: "hquocthung.dev@gmail.com",
    href: "mailto:hquocthung.dev@gmail.com",
    icon: FaEnvelope,
    note: "Best for internship and backend developer opportunities.",
  },
  {
    label: "Phone",
    value: "098-1641-622",
    href: "tel:0981641622",
    icon: FaPhone,
    note: "Available for direct contact in Ho Chi Minh City.",
  },
  {
    label: "Website",
    value: "www.harryleon.id.vn",
    href: "https://www.harryleon.id.vn",
    icon: FaGlobe,
    note: "Portfolio, projects, and technical profile.",
  },
  {
    label: "GitHub",
    value: "github.com/harry-leon",
    href: "https://github.com/harry-leon",
    icon: FaGithub,
    note: "Code repositories and project history.",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/harryleon",
    href: "https://www.linkedin.com/in/harryleon",
    icon: FaLinkedin,
    note: "Professional profile and work updates.",
  },
]

export const metadata: Metadata = {
  title: `Contact | ${homeIntroConfig.name}`,
  description:
    "Contact Ha Thuc Quoc Hung for backend Java development roles, internship opportunities, and project collaboration.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${homeIntroConfig.name}`,
    description:
      "Get in touch with Ha Thuc Quoc Hung through email, phone, GitHub, LinkedIn, or portfolio website.",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center rounded-full border border-accent-500/40 bg-accent-500/10 px-4 py-1 text-sm font-semibold text-accent-600 dark:text-accent-400">
              Contact
            </span>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Let&apos;s build secure backend systems that hold up in production.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              I am a Backend Java Developer focused on Spring Boot, REST APIs, PostgreSQL, security,
              and business-heavy systems. If you have an internship, junior backend role, or project
              collaboration in mind, reach out through any channel below.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactItems.map(item => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target={
                    item.href.startsWith("mailto:") || item.href.startsWith("tel:")
                      ? undefined
                      : "_blank"
                  }
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group rounded-3xl border border-gray-300 bg-white/70 p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent-500/60 hover:shadow-lg dark:border-gray-800 dark:bg-zinc-900/80 dark:hover:border-accent-500/60"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-2xl border border-accent-500/30 bg-accent-500/10 p-3 text-accent-600 dark:text-accent-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                        {item.label}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 transition-colors group-hover:text-accent-600 dark:text-white dark:group-hover:text-accent-400">
                        {item.value}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">{item.note}</p>
                </Link>
              )
            })}
          </div>
        </div>

        <aside className="rounded-[2rem] border border-gray-300 bg-linear-to-br from-white/90 via-white/75 to-accent-500/10 p-6 shadow-lg dark:border-gray-800 dark:from-zinc-950/95 dark:via-zinc-900/90 dark:to-accent-500/10">
          <div className="mb-6 flex items-center gap-3 text-gray-900 dark:text-white">
            <FaMapMarkerAlt className="h-5 w-5 text-accent-600 dark:text-accent-400" />
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                Base
              </p>
              <p className="text-lg font-semibold">Ho Chi Minh City, Vietnam</p>
            </div>
          </div>

          <div className="space-y-5 text-gray-600 dark:text-gray-300">
            <div>
              <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                What I can help with
              </h2>
              <p className="leading-7">
                Spring Boot backend services, RESTful API design, authentication and RBAC,
                PostgreSQL data modeling, payment or booking workflows, and full-stack integration
                with modern frontend apps.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                Preferred contact
              </h2>
              <p className="leading-7">
                Email is the cleanest channel for role details, technical discussions, and project
                scope. For quick coordination, phone and LinkedIn are also available.
              </p>
            </div>

            <div className="rounded-3xl border border-accent-500/20 bg-accent-500/10 p-4 text-sm leading-7 text-gray-700 dark:text-gray-200">
              <p className="font-semibold text-gray-900 dark:text-white">Current focus</p>
              <p>
                Seeking backend Java internship or junior backend opportunities where I can ship
                production-quality features and grow deeper in distributed systems and application
                security.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
