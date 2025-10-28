/**
 * Integration Tests
 * These tests verify that different parts of the application work together correctly
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../../pages/index'

// Mock ContactForm component
jest.mock('../../components/ContactForm', () => {
  return function MockContactForm() {
    const React = require('react')
    return React.createElement(
      'div',
      { 'data-testid': 'contact-form' },
      'Contact Form'
    )
  }
})

// Mock SpotifyPlaylist component
jest.mock('../../components/SpotifyPlaylist', () => {
  return function MockSpotifyPlaylist() {
    const React = require('react')
    return React.createElement(
      'div',
      { 'data-testid': 'spotify-playlist' },
      'Spotify Playlist'
    )
  }
})

// Mock ChakraUI components with complete prop consumption
jest.mock('@chakra-ui/react', () => {
  // Helper function to filter props
  const filterDOMProps = props => {
    const allowedProps = [
      'className',
      'style',
      'id',
      'role',
      'aria-label',
      'data-testid',
      'onClick',
      'href',
      'target',
      'rel',
      'disabled'
    ]
    const domProps = {}
    Object.keys(props).forEach(key => {
      if (
        allowedProps.includes(key) ||
        key.startsWith('data-') ||
        key.startsWith('aria-')
      ) {
        domProps[key] = props[key]
      }
    })
    return domProps
  }

  return {
    Container: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return (
        <div data-testid="container" {...domProps}>
          {children}
        </div>
      )
    },
    Box: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return (
        <div data-testid="box" {...domProps}>
          {children}
        </div>
      )
    },
    Heading: ({ children, as = 'h1', ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement(
        as,
        { 'data-testid': 'heading', ...domProps },
        children
      )
    },
    Button: ({
      children,
      _as,
      href,
      target,
      rel,
      onClick,
      isDisabled,
      ...allProps
    }) => {
      const domProps = filterDOMProps({
        onClick,
        href,
        target,
        rel,
        disabled: isDisabled,
        ...allProps
      })

      if (href) {
        return (
          <a data-testid="button" {...domProps}>
            {children}
          </a>
        )
      }
      return (
        <button data-testid="button" {...domProps}>
          {children}
        </button>
      )
    },
    Link: ({ children, href, target, rel, ...allProps }) => {
      const domProps = filterDOMProps({ href, target, rel, ...allProps })
      return (
        <a data-testid="chakra-link" {...domProps}>
          {children}
        </a>
      )
    },
    List: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return (
        <ul data-testid="list" {...domProps}>
          {children}
        </ul>
      )
    },
    ListItem: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return (
        <li data-testid="list-item" {...domProps}>
          {children}
        </li>
      )
    },
    useColorModeValue: (light, _dark) => light
  }
})

// Mock ChakraUI icons
jest.mock('@chakra-ui/icons', () => ({
  ChevronRightIcon: () => <span data-testid="chevron-right">→</span>
}))

// Mock react-icons
jest.mock('react-icons/io5', () => ({
  IoLogoGithub: () => <span data-testid="github-icon">GitHub</span>,
  IoLogoLinkedin: () => <span data-testid="linkedin-icon">LinkedIn</span>,
  IoMail: () => <span data-testid="email-icon">Email</span>
}))

jest.mock('react-icons/md', () => ({
  MdKeyboardArrowRight: () => <span data-testid="arrow-right-icon">→</span>,
  MdEmail: () => <span data-testid="email-icon">Email</span>
}))

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
})

// Mock custom components
jest.mock('../../components/paragraph', () => {
  return function MockParagraph({ children }) {
    return <p data-testid="paragraph">{children}</p>
  }
})

jest.mock('../../components/bio', () => ({
  BioSection: ({ children }) => <div data-testid="bio-section">{children}</div>,
  BioYear: ({ children }) => <span data-testid="bio-year">{children}</span>
}))

jest.mock('../../components/section', () => {
  return function MockSection({ children, delay: _delay }) {
    return <section data-testid="section">{children}</section>
  }
})

jest.mock('../../components/layouts/article', () => {
  return function MockLayout({ children }) {
    return <main data-testid="main-layout">{children}</main>
  }
})

// Mock useI18n hook with comprehensive data
jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    t: (key, fallback) => fallback,
    getHome: () => ({
      hero: {
        greeting: 'Hola, soy Alvaro Peña!',
        title: 'Backend-focused Full Stack Developer',
        description: 'Apasionado por Go, Python y Java'
      },
      about: {
        title: 'Sobre Mí',
        content:
          'Desarrollador con experiencia en Go, Python y Java. Me especializo en backend con FastAPI, Spring Boot y desarrollo de APIs robustas.'
      },
      experience: {
        title: 'Experiencia',
        jobs: [
          {
            position: 'Backend Developer',
            company: 'Guinea Mobile',
            period: '2025 febrero - 2025 septiembre',
            location: 'Lima, Perú'
          },
          {
            position: 'Freelance Developer',
            company: 'Independiente',
            period: '2024 febrero - 2025 febrero',
            location: 'Ica, Perú'
          },
          {
            position: 'Practicante de Desarrollo',
            company: 'Empresa Local',
            period: '2023 octubre - 2024 enero',
            location: 'Ica, Perú'
          }
        ]
      },
      stack: {
        title: 'Stack',
        technologies: 'Go, Python y Java. Frameworks: FastAPI, Spring Boot'
      },
      contact: {
        title: 'Contacto',
        links: [
          {
            type: 'github',
            url: 'https://github.com/aalvaropc',
            label: 'GitHub'
          },
          {
            type: 'linkedin',
            url: 'https://www.linkedin.com/in/aalvarop-pe/',
            label: 'LinkedIn'
          },
          { type: 'email', url: 'mailto:aalvaropc@gmail.com', label: 'Email' }
        ]
      },
      projects: {
        cta: 'Ver Proyectos'
      },
      interests: {
        title: 'Intereses',
        items: ['Google Developer Group Ica']
      }
    })
  })
}))

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

    // Contact links should have proper hrefs
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/aalvaropc')

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/aalvarop-pe/'
    )

    const emailLink = screen.getByRole('link', { name: /email/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:aalvaropc@gmail.com')
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
