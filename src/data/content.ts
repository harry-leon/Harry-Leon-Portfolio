import { IconType } from "react-icons"
import {
  FaMapMarkerAlt,
  FaLanguage,
  FaUniversity,
  FaTools,
  FaPhone,
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaGoodreads,
  FaEnvelope,
  FaInstagram,
  FaReddit,
  FaDribbble,
  FaYoutube,
  FaStackOverflow,
} from "react-icons/fa"
import { FaBluesky, FaXTwitter } from "react-icons/fa6"

/**
 * Configuration for the home page intro section
 */
export const homeIntroConfig = {
  /**
   * Your full name (used in breadcrumbs, footer, and other places)
   */
  name: "Ha Thuc Quoc Hung",

  /**
   * Your short/first name (optional - used in "Hi, I'm..." greeting)
   * If not provided, the full name will be used
   */
  shortName: "Hung",

  /**
   * Introduction paragraphs (can be multiple)
   */
  introParagraphs: [
    "Third-year Software Engineering student focused on backend development, with practical experience building secure RESTful services using Java and Spring Boot.",
    "I developed an authentication system with JWT security, RBAC, and PostgreSQL, deployed via Docker. I am seeking a Backend Developer internship to further develop my real-world engineering skills.",
  ],

  /**
   * Quick facts displayed as chips below your introduction
   * Fill in the fields below. Leave empty ("") to hide a fact.
   */
  facts: {
    company: "",
    education: "Software Engineering @ FPT University HCM",
    location: "Ho Chi Minh City, Vietnam",
    languages: "",
    role: "Backend Java Developer",
  },

  /**
   * Additional custom facts to display below the predefined ones.
   * Add any extra facts you want to display with their icons.
   * You must use an icon from react-icons and provide its label.
   */
  additionalFacts: [
    { icon: FaGithub, label: "github.com/harry-leon", href: "https://github.com/harry-leon" },
    {
      icon: FaLinkedin,
      label: "linkedin.com/in/harryleon",
      href: "https://www.linkedin.com/in/harryleon",
    },
  ] as Array<{ icon: IconType; label: string; href?: string }>,

  /**
   * Number of work items to show in the preview sections on the home page.
   * Note that the actual number shown may be less if there aren't enough items.
   * If the actual number of items is larger than this, a "View All" link will be displayed.
   * This number must be a number greater than zero.
   */
  workItemsToShow: 3,

  /**
   * Number of projects to show in the preview sections on the home page.
   * Note that the actual number shown may be less if there aren't enough items.
   * If the actual number of items is larger than this, a "View All" link will be displayed.
   * This number must be a number greater than zero. We recommend keeping it low and
   * having a multiple of 2 for better grid layout (e.g., 2 or 4).
   */
  projectsToShow: 4,

  /**
   * Number of blog posts and projects to show in the preview sections on the home page.
   * Note that the actual number shown may be less if there aren't enough items.
   * If the actual number of items is larger than this, a "View All" link will be displayed.
   * This number must be a number greater than zero. We recommend keeping it low (=3) and
   * having a multiple of 3 for better grid layout.
   */
  blogPostsToShow: 3,
}

export const skillsConfig = [
  {
    category: "Programming Languages",
    skills: ["Java", "Thymeleaf", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Frameworks",
    skills: ["Spring Framework", "Hibernate / JPA", "Bootstrap"],
  },
  {
    category: "Databases",
    skills: ["SQL Server", "PostgreSQL"],
  },
  {
    category: "DevOps",
    skills: ["Docker", "Jenkins", "CI/CD", "Git"],
  },
  {
    category: "Cloud & Storage",
    skills: ["AWS", "Azure", "Cloudflare R2"],
  },
  {
    category: "Security & Authentication",
    skills: ["OAuth 2.0", "RBAC", "JWT"],
  },
  {
    category: "Infrastructure",
    skills: ["Bare Metal", "High Availability", "Fault Tolerance"],
  },
  {
    category: "Others",
    skills: ["Agile/Scrum", "Project Management", "Microservices"],
  },
]

/**
 * Configuration for pagination settings within the site.
 */
export const paginationConfig = {
  /**
   * Number of blog posts to show per page for "/blog" and "/blog?page=n" routes.
   * This number must be a number greater than zero.
   */
  blogPostsPerPage: 5,

  /**
   * Number of work items to show per page for "/work" and "/work?page=n" routes.
   * This number must be a number greater than zero.
   */
  workItemsPerPage: 6,

  /**
   * Number of projects to show per page for "/projects" and "/projects?page=n" routes.
   * This number must be a number greater than zero.
   */
  projectsPerPage: 6,
}

/**
 * Configuration for the footer
 */
export const footerConfig = {
  /**
   * Name displayed in the copyright notice
   */
  copyrightName: "Ha Thuc Quoc Hung",

  /**
   * Show version and attribution section
   * Set to true if you want to hide the "built by @alemoraru" attribution and version number.
   * By default, this is true to give credit to the template creator, but you can disable it if desired.
   */
  showVersionAndAttribution: false,

  /**
   * Social media links
   * Simply add your URLs below. Leave empty ("") to hide a social link.
   */
  socialLinks: {
    github: "https://github.com/harry-leon",
    linkedin: "https://www.linkedin.com/in/harryleon",
    goodreads: "",
    instagram: "",
    twitter: "",
    reddit: "",
    dribbble: "",
    youtube: "",
    bluesky: "",
    stackoverflow: "",
    email: "hquocthung.dev@gmail.com",
  },
}

// USERS DO NOT NEED TO MODIFY BELOW THIS LINE
// YOU CAN, HOWEVER, EXTEND THE ICON MAPS IF NEEDED

/**
 * Internal mapping of predefined fact categories to their icons
 * This is used internally by the HomeContent component - users don't need to modify this
 */
export const factIconMap: Record<keyof typeof homeIntroConfig.facts, IconType> = {
  company: FaTools,
  education: FaUniversity,
  location: FaMapMarkerAlt,
  languages: FaLanguage,
  role: FaTools,
}

/**
 * Internal mapping of social platforms to their icons and labels
 * This is used internally by the Footer component - users don't need to modify this
 */
export const socialIconMap: Record<
  keyof typeof footerConfig.socialLinks,
  { icon: IconType; label: string }
> = {
  github: { icon: FaGithub, label: "GitHub" },
  linkedin: { icon: FaLinkedin, label: "LinkedIn" },
  goodreads: { icon: FaGoodreads, label: "GoodReads" },
  instagram: { icon: FaInstagram, label: "Instagram" },
  twitter: { icon: FaXTwitter, label: "X" },
  reddit: { icon: FaReddit, label: "Reddit" },
  dribbble: { icon: FaDribbble, label: "Dribbble" },
  youtube: { icon: FaYoutube, label: "YouTube" },
  bluesky: { icon: FaBluesky, label: "Bluesky" },
  stackoverflow: { icon: FaStackOverflow, label: "Stack Overflow" },
  email: { icon: FaEnvelope, label: "Email" },
}
