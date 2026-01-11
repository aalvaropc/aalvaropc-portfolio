/**
 * Integration Tests
 * These tests verify that different parts of the application work together correctly
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

describe('Home Page Integration', () => {
  it('renders complete home page with all sections', () => {
    render(<Home />)

    // Hero section - use more specific selector
    const heroElements = screen.getAllByText(
      /backend-focused full stack developer/i
    )
    expect(heroElements.length).toBeGreaterThan(0)

    // About section
    expect(screen.getByText(/sobre mí/i)).toBeInTheDocument()
    expect(screen.getByText(/go, python y java/i)).toBeInTheDocument()

    // Experience section - use heading role to be specific
    expect(
      screen.getByRole('heading', { name: /experiencia/i })
    ).toBeInTheDocument()
    const shinkansenElements = screen.getAllByText(/shinkansen/i)
    expect(shinkansenElements.length).toBeGreaterThan(0)
    const guineaMobileElements = screen.getAllByText(/guinea mobile/i)
    expect(guineaMobileElements.length).toBeGreaterThan(0)

    // Stack section
    expect(screen.getByRole('heading', { name: /stack/i })).toBeInTheDocument()
    expect(screen.getByText(/fastapi.*spring boot/i)).toBeInTheDocument()

    // Contact section
    expect(
      screen.getByRole('heading', { name: /contacto/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/github/i)).toBeInTheDocument()
  })

  it('has proper navigation flow', () => {
    render(<Home />)

    // Main CTA is rendered as a link when href is provided
    const projectsLink = screen.getByRole('link', { name: /ver proyectos/i })
    expect(projectsLink).toHaveAttribute('href', '/works')

    // Contact links should be accessible and have proper hrefs
    // Find the containers with href attributes and verify they contain the right content
    const githubContainer = screen.getByText(/github/i).closest('[href]')
    expect(githubContainer).toHaveAttribute(
      'href',
      'https://github.com/aalvaropc'
    )

    const linkedinContainer = screen.getByText(/linkedin/i).closest('[href]')
    expect(linkedinContainer).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/aalvarop-pe/'
    )

    // For email, we need to be more specific since there are multiple "Email" texts
    const contactSection = screen.getByTestId('list')
    const emailContainer = contactSection.querySelector('[href*="mailto:"]')
    expect(emailContainer).toHaveAttribute('href', 'mailto:aalvaropc@gmail.com')
  })

  it('maintains proper semantic HTML structure', () => {
    render(<Home />)

    // Should have main heading with name
    expect(screen.getByText(/alvaro peña/i)).toBeInTheDocument()

    // Should have section headings
    const headings = screen.getAllByTestId('heading')
    expect(headings.length).toBeGreaterThan(3)

    // Should have proper list structure for contact
    const contactList = screen.getByTestId('list')
    expect(contactList).toBeInTheDocument()
  })

  it('displays professional information accurately', () => {
    render(<Home />)

    // Professional title - updated to match current content
    expect(screen.getByText(/software engineer/i)).toBeInTheDocument()

    // Experience timeline
    expect(screen.getByText(/2026 enero - presente/i)).toBeInTheDocument()
    expect(
      screen.getByText(/2025 febrero - 2025 septiembre/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/2024 febrero - 2025 febrero/i)).toBeInTheDocument()
    expect(screen.getByText(/2023 octubre - 2024 enero/i)).toBeInTheDocument()

    // Technology stack
    expect(
      screen.getByText(/go • python • java • fastapi • spring boot/i)
    ).toBeInTheDocument()

    // Google Developer Group mention - check that it appears at least once
    const gdgElements = screen.getAllByText(/google developer group ica/i)
    expect(gdgElements.length).toBeGreaterThan(0)
  })
})
