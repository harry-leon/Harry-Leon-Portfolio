import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { AccentThemeProvider } from "@/components/AccentThemeProvider"
import Header from "@/components/Header"
import { PageHeaderProvider } from "@/components/PageHeaderProvider"
import { homeIntroConfig } from "@/data/content"
import { getInitials } from "@/lib/utils"

// Header renders ThemeToggleButton, which reads accent theme state via `useAccentTheme()`,
// and reads the current detail page's title/subtitle via `usePageHeader()`, so it must be
// rendered within both an `AccentThemeProvider` and a `PageHeaderProvider`.
function renderHeader() {
  return render(
    <AccentThemeProvider>
      <PageHeaderProvider>
        <Header />
      </PageHeaderProvider>
    </AccentThemeProvider>
  )
}

describe("Header", () => {
  it("renders the header element with the correct id", () => {
    renderHeader()
    const header = document.getElementById("headerPortfolio")
    expect(header).not.toBeNull()
    expect(header?.tagName).toBe("HEADER")
  })

  it("renders the site name from breadcrumbs", () => {
    renderHeader()
    expect(screen.getByText(homeIntroConfig.name)).toBeDefined()
  })

  it("renders the initials for mobile breadcrumbs", () => {
    renderHeader()
    const initials = getInitials(homeIntroConfig.name)
    expect(screen.getByText(initials)).toBeDefined()
  })

  it("renders navigation items", () => {
    renderHeader()
    expect(screen.getByText("Home")).toBeDefined()
    expect(screen.getByText("Education")).toBeDefined()
    expect(screen.getByText("Projects")).toBeDefined()
    expect(screen.getByText("Contact")).toBeDefined()
  })

  it("renders navigation links with correct hrefs", () => {
    renderHeader()
    const homeLink = screen.getByText("Home").closest("a")
    const educationLink = screen.getByText("Education").closest("a")
    const projectsLink = screen.getByText("Projects").closest("a")
    const contactLink = screen.getByText("Contact").closest("a")

    expect(homeLink?.getAttribute("href")).toBe("/")
    expect(educationLink?.getAttribute("href")).toBe("/work")
    expect(projectsLink?.getAttribute("href")).toBe("/projects")
    expect(contactLink?.getAttribute("href")).toBe("/contact")
  })

  it("renders the theme toggle button", () => {
    renderHeader()
    const themeButton = screen.getByLabelText(/switch to dark mode/i)
    expect(themeButton).toBeDefined()
  })

  it("renders the mobile menu toggle button", () => {
    renderHeader()
    const menuButton = screen.getByLabelText("Open menu")
    expect(menuButton).toBeDefined()
  })

  it("toggles the mobile menu toggle aria-label on click", () => {
    renderHeader()
    const menuButton = screen.getByLabelText("Open menu")

    fireEvent.mouseDown(menuButton)

    expect(screen.getByLabelText("Close menu")).toBeDefined()
  })

  it("marks the current page as active in the navigation", () => {
    renderHeader()
    const homeLink = screen.getByText("Home").closest("a")
    expect(homeLink?.getAttribute("aria-current")).toBe("page")
  })
})