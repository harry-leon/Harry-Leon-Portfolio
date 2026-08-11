import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { AccentThemeProvider } from "@/components/AccentThemeProvider"
import Header from "@/components/Header"
import { PageHeaderProvider } from "@/components/PageHeaderProvider"
import { navItems } from "@/lib/constants"

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
  it("renders the header and navigation links", () => {
    renderHeader()
    expect(screen.getByText("Harry Leon")).toBeDefined()
  })

  it("renders all navigation items from navItems constant", () => {
    renderHeader()
    navItems.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeDefined()
    })
  })

  it("renders the mobile menu toggle button", () => {
    renderHeader()
    const menuButton = screen.getByLabelText("Open menu")
    expect(menuButton).toBeDefined()
  })

  it("toggles the mobile menu toggle aria-label on click", () => {
    renderHeader()
    const menuButton = screen.getByLabelText("Open menu")

    fireEvent.click(menuButton)
    expect(screen.getByLabelText("Close menu")).toBeDefined()

    fireEvent.click(menuButton)
    expect(screen.getByLabelText("Open menu")).toBeDefined()
  })

  it("marks the active page in the navigation with aria-current", () => {
    renderHeader()
    const homeButton = screen.getByText("Home")
    expect(homeButton.getAttribute("aria-current")).toBe("true")
  })
})
