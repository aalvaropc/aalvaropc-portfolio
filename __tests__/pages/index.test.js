import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

describe('Home Page', () => {
  it('renders main heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', { name: /Alvaro peña/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays professional title', () => {
    render(<Home />)

    // Buscamos el texto directamente en lugar de por testid para evitar múltiples matches
    expect(
      screen.getByText('Backend-focused Full Stack Developer')
    ).toBeInTheDocument()
  })

  it('shows about section', () => {
    render(<Home />)

    const aboutHeading = screen.getByRole('heading', { name: /sobre mí/i })
    expect(aboutHeading).toBeInTheDocument()
  })

  it('displays technology stack', () => {
    render(<Home />)

    const stackHeading = screen.getByRole('heading', { name: /stack/i })
    expect(stackHeading).toBeInTheDocument()

    // Buscamos en la sección específica del stack
    const stackSection = stackHeading.closest('[data-testid="section"]')
    expect(stackSection).toHaveTextContent('Go • Python • Java')
    expect(stackSection).toHaveTextContent('FastAPI')
    expect(stackSection).toHaveTextContent('Spring Boot')
  })

  it('shows experience section', () => {
    render(<Home />)

    const experienceHeading = screen.getByRole('heading', {
      name: /experiencia/i
    })
    expect(experienceHeading).toBeInTheDocument()
  })

  it('displays contact information', () => {
    render(<Home />)

    const contactHeading = screen.getByRole('heading', { name: /contacto/i })
    expect(contactHeading).toBeInTheDocument()
  })

  it('has link to projects', () => {
    render(<Home />)

    const projectsLink = screen.getByRole('link', {
      name: /ver proyectos/i
    })
    expect(projectsLink).toBeInTheDocument()
    expect(projectsLink).toHaveAttribute('href', '/works')
  })

  it('shows professional experience timeline', () => {
    render(<Home />)

    const experienceSection = screen
      .getByRole('heading', { name: /experiencia/i })
      .closest('[data-testid="section"]')
    expect(experienceSection).toHaveTextContent('Guinea Mobile')
    expect(experienceSection).toHaveTextContent('NTT Data')
    expect(experienceSection).toHaveTextContent('Proveedy')
  })

  it('displays interests section', () => {
    render(<Home />)

    const interestsHeading = screen.getByRole('heading', { name: /intereses/i })
    expect(interestsHeading).toBeInTheDocument()

    const interestsSection = interestsHeading.closest('[data-testid="section"]')
    expect(interestsSection).toHaveTextContent('Arquitecturas escalables')
    expect(interestsSection).toHaveTextContent('Sistemas distribuidos')
  })
})
