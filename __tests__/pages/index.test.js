import { render, screen } from '@testing-library/react'
import React from 'react'
import Home from '../../pages/index'

describe('Home page', () => {
  it('renders the name and role', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /alvaro peña/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Systems Engineer')).toBeInTheDocument()
  })

  it('links the primary CTA to /works', () => {
    render(<Home />)
    const worksLink = screen
      .getAllByRole('link')
      .find(l => l.getAttribute('href') === '/works')
    expect(worksLink).toBeTruthy()
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
