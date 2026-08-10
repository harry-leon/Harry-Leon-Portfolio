import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Footer from "@/components/Footer"
import { footerConfig } from "@/data/content"

describe("Footer", () => {
  it("renders the footer element with the correct id", () => {
    render(<Footer />)
    const footer = document.getElementById("footerPortfolio")
    expect(footer).not.toBeNull()
    expect(footer?.tagName).toBe("FOOTER")
  })

  it("renders the copyright text with the current year", () => {
    render(<Footer />)
    const year = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`Ã‚Â© ${year}`))).toBeDefined()
  })

  it("renders the copyright name", () => {
    render(<Footer />)
    expect(screen.getByText(new RegExp(footerConfig.copyrightName))).toBeDefined()
  })

  it("renders the configured social links", () => {
    render(<Footer />)

    const emailLink = screen.getByLabelText("Email")
    expect(emailLink).toBeDefined()

    const githubLink = screen.getByLabelText("GitHub")
    expect(githubLink.getAttribute("href")).toBe(footerConfig.socialLinks.github)

    const linkedInLink = screen.getByLabelText("LinkedIn")
    expect(linkedInLink.getAttribute("href")).toBe(footerConfig.socialLinks.linkedin)
  })

  it("renders the email link with a mailto: prefix", () => {
    render(<Footer />)
    const emailLink = screen.getByLabelText("Email")
    const expectedEmail = footerConfig.socialLinks.email.startsWith("mailto:")
      ? footerConfig.socialLinks.email
      : `mailto:${footerConfig.socialLinks.email}`
    expect(emailLink.getAttribute("href")).toBe(expectedEmail)
  })

  it("renders the email link as an anchor element", () => {
    render(<Footer />)
    expect(screen.getByLabelText("Email").tagName).toBe("A")
  })

  it("hides template attribution when disabled", () => {
    render(<Footer />)
    expect(screen.queryByText(/built by/i)).toBeNull()
  })
})
