import { IconType } from "react-icons"
import {
  SiFlyway,
  SiGithubactions,
  SiJsonwebtokens,
  SiReactquery,
  SiSpringsecurity,
} from "react-icons/si"
import DevIcon from "@/components/DevIcon"
import { normalizeTechName } from "@/lib/utils"

/**
 * Maps normalized tech names to their SVG icon filename when the two differ.
 * Any name not listed here is passed directly to DevIcon after normalization.
 * DevIcon falls back to FiCpu automatically if the SVG file does not exist.
 * The idea is to handle common abbreviations and variations that DevIcon does not recognize,
 * while still allowing for flexible input and gracefully resolving to a default icon when necessary.
 */
const iconExceptions: Record<string, string> = {
  ts: "typescript",
  js: "javascript",
  react: "reactjs",
  "react-native": "reactjs",
  reactnative: "reactjs",
  next: "nextjs",
  nuxt: "nuxtjs",
  node: "nodejs",
  "node-js": "nodejs",
  tailwind: "tailwindcss",
  springboot: "spring",
  "spring-boot": "spring",
  "spring-boot-33": "spring",
  "spring-boot-3-3": "spring",
  "spring-security": "spring",
  "spring-data-jpa": "spring",
  "java-21": "java",
  "nextjs-14": "nextjs",
  "next-js-14": "nextjs",
  "react-18": "reactjs",
  postgres: "postgresql",
  "postgresql-16": "postgresql",
  mapstruct: "java",
  zustand: "reactjs",
  c: "c-sharp",
  csharp: "c-sharp",
  flask: "flask-dark",
  github: "github-dark",
  "github-actions": "github-dark",
  gcp: "google-cloud",
  "aws-iot": "aws",
  awsiot: "aws",
  vue: "vuejs",
  go: "golang",
  html: "html5",
  "robot-operating-system": "ros",
  "ros-robot-operating-system": "ros",
  "web3-js": "web3js",
  "oculus-sdk": "oculus",
}

const brandedIconMap: Record<string, IconType> = {
  flyway: SiFlyway,
  jwt: SiJsonwebtokens,
  "tanstack-query": SiReactquery,
  "github-actions": SiGithubactions,
  "spring-security": SiSpringsecurity,
}

/**
 * Maps a technology name to its corresponding icon component.
 * Normalizes the input, checks the exceptions map for icon filename overrides,
 * then delegates to DevIcon which falls back to FiCpu if the SVG is not found.
 * @param techName - Name of the technology (e.g., "TypeScript", "ts", "React Native").
 * @param iconClassName - Optional CSS class names for the icon.
 * @returns A React component representing the icon for the specified technology.
 */
export function techToIcon(techName: string, iconClassName?: string) {
  const normalized = normalizeTechName(techName)
  const BrandedIcon = brandedIconMap[normalized]

  if (BrandedIcon) {
    return <BrandedIcon className={iconClassName ?? "size-6"} />
  }

  const iconName = iconExceptions[normalized] ?? normalized
  return <DevIcon name={iconName} iconClassName={iconClassName} />
}