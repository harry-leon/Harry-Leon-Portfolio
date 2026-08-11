import packageJson from "../../package.json"

/**
 * Navigation items for the one-page landing portfolio.
 * Each item scrolls to its corresponding section via `sectionId`.
 */
export const navItems = [
  { name: "Home", sectionId: "hero" },
  { name: "About", sectionId: "about" },
  { name: "Skills", sectionId: "skills" },
  { name: "Projects", sectionId: "projects" },
]

/**
 * Version of the application from package.json.
 */
export const appVersion = packageJson.version

/**
 * Sentinel value used in work/project frontmatter `end`/`endDate` fields to mean
 * "ongoing, no end date yet".
 */
export const PRESENT = "Present"

/**
 * Default number of tag-similarity-suggested blog posts to show, e.g. at the bottom of a
 * blog post ("Other posts that might interest you") or on a tag page with no exact matches.
 */
export const DEFAULT_SIMILAR_POSTS_COUNT = 3

/**
 * Max number of tech-stack badges shown on a project card before collapsing the rest into
 * a "+N more" chip.
 */
export const MAX_PROJECT_TILE_TECH_BADGES = 5
