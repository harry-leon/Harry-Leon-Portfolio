import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import MobileMenu from "@/components/MobileMenu"
import { navItems } from "@/lib/constants"

describe("MobileMenu", () => {
  let mockOnClose: any
  let mockOnNavigate: any

  beforeEach(() => {
    mockOnClose = vi.fn()
    mockOnNavigate = vi.fn()
  })

  afterEach(() => {
    document.body.style.overflow = ""
  })

  const renderMenu = (isHome = true, activeSection = "hero") => {
    return render(
      <MobileMenu
        onClose={mockOnClose}
        onNavigate={mockOnNavigate}
        activeSection={activeSection}
        isHome={isHome}
      />
    )
  }

  it("renders the menu and navigation items", () => {
    renderMenu()
    const menu = screen.getByRole("list")
    expect(menu).toBeDefined()

    navItems.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeDefined()
    })
  })

  it("calls onNavigate when a link is clicked", () => {
    renderMenu()
    const homeLink = screen.getByText("Home")
    fireEvent.click(homeLink)

    expect(mockOnNavigate).toHaveBeenCalledWith("hero")
  })

  it("sets body overflow to hidden when mounted", () => {
    renderMenu()
    expect(document.body.style.overflow).toBe("hidden")
  })

  it("resets body overflow when unmounted", () => {
    const { unmount } = renderMenu()
    expect(document.body.style.overflow).toBe("hidden")
    unmount()
    expect(document.body.style.overflow).toBe("")
  })

  it("closes menu when clicking outside", () => {
    render(
      <div data-testid="outside">
        <MobileMenu
          onClose={mockOnClose}
          onNavigate={mockOnNavigate}
          activeSection="hero"
          isHome={true}
        />
      </div>
    )

    const outside = screen.getByTestId("outside")
    fireEvent.mouseDown(outside)

    expect(mockOnClose).toHaveBeenCalled()
  })

  it("does not close menu when clicking inside the menu", () => {
    renderMenu()
    const menu = screen.getByRole("list")
    fireEvent.mouseDown(menu)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it("renders correct number of list items", () => {
    renderMenu()
    const listItems = screen.getAllByRole("listitem")
    // navItems + Contact CTA link
    expect(listItems.length).toBe(navItems.length + 1)
  })
})
