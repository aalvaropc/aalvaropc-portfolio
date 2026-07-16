import { render, screen } from '@testing-library/react'
import React from 'react'
import Home from '../../pages/index'

describe('Home page', () => {
  it('renders the name and role', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /alvaro peña/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
  })

  it('uses contact as the primary CTA', () => {
    render(<Home />)
    const ctas = screen.getAllByRole('link')
    const primary = ctas.find(l =>
      (l.getAttribute('href') || '').startsWith('mailto:')
    )
    expect(primary).toBeTruthy()
    expect(primary.className).toMatch(/bg-foreground/)
  })

  it('sections are real headings, not styled paragraphs', () => {
    render(<Home />)
    const h2s = screen.getAllByRole('heading', { level: 2 })
    expect(h2s.length).toBeGreaterThanOrEqual(4)
  })

  it('lists the experience companies', () => {
    render(<Home />)
    expect(screen.getByText('Shinkansen')).toBeInTheDocument()
    expect(screen.getByText('Guinea Mobile')).toBeInTheDocument()
    expect(screen.getByText('NTT Data')).toBeInTheDocument()
  })

  it('shows the technology stack', () => {
    render(<Home />)
    expect(screen.getByText('Go')).toBeInTheDocument()
    expect(screen.getByText('FastAPI')).toBeInTheDocument()
    expect(screen.getByText('PostgreSQL')).toBeInTheDocument()
  })

  it('exposes a contact email link', () => {
    render(<Home />)
    const mailtos = screen
      .getAllByRole('link')
      .filter(l => (l.getAttribute('href') || '').startsWith('mailto:'))
    expect(mailtos.length).toBeGreaterThan(0)
    expect(mailtos[0]).toHaveAttribute('href', 'mailto:aalvaropc@gmail.com')
  })
})
