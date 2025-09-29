import React from 'react'
import { screen, render } from '@testing-library/react'
import Home from '../../pages/index'

// Mock ChakraUI components with prop filtering
jest.mock('@chakra-ui/react', () => {
  // Helper function to filter props
  const filterDOMProps = (props) => {
    const allowedProps = ['className', 'style', 'id', 'role', 'aria-label', 'data-testid', 'onClick', 'href', 'target', 'rel', 'disabled']
    const domProps = {}
    Object.keys(props).forEach(key => {
      if (allowedProps.includes(key) || key.startsWith('data-') || key.startsWith('aria-')) {
        domProps[key] = props[key]
      }
    })
    return domProps
  }

  return {
    Container: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement('div', { 'data-testid': 'container', ...domProps }, children)
    },
    Box: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement('div', { 'data-testid': 'box', ...domProps }, children)
    },
    Heading: ({ children, as, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement(as || 'h1', { 'data-testid': 'heading', ...domProps }, children)
    },
    useColorModeValue: (light, _dark) => light,
    Link: ({ children, href, ...allProps }) => {
      const domProps = filterDOMProps({ href, ...allProps })
      return React.createElement('a', { 'data-testid': 'link', ...domProps }, children)
    },
    Button: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement('button', { 'data-testid': 'button', ...domProps }, children)
    },
    List: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement('ul', { 'data-testid': 'list', ...domProps }, children)
    },
    ListItem: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement('li', { 'data-testid': 'list-item', ...domProps }, children)
    }
  }
})

jest.mock('../../components/paragraph', () => {
  return ({ children }) => React.createElement('p', { 'data-testid': 'paragraph' }, children)
})

jest.mock('next/link', () => {
  return ({ children, href, ...props }) => {
    return React.createElement('a', { href, ...props }, children)
  }
})

jest.mock('@chakra-ui/icons', () => ({
  ChevronRightIcon: () => React.createElement('span', { 'data-testid': 'chevron-right-icon' }, '→')
}))

jest.mock('../../components/bio', () => ({
  BioSection: ({ children }) => React.createElement('div', { 'data-testid': 'bio-section' }, children),
  BioYear: ({ children }) => React.createElement('span', { 'data-testid': 'bio-year' }, children)
}))

jest.mock('react-icons/io5', () => ({
  IoLogoLinkedin: () => React.createElement('span', { 'data-testid': 'linkedin-icon' }, 'LI'),
  IoLogoGithub: () => React.createElement('span', { 'data-testid': 'github-icon' }, 'GH')
}))

jest.mock('react-icons/md', () => ({
  MdEmail: () => React.createElement('span', { 'data-testid': 'email-icon' }, '@')
}))

jest.mock('../../components/layouts/article', () => {
  return ({ children }) => React.createElement('div', { 'data-testid': 'layout' }, children)
})

jest.mock('../../components/section', () => {
  return ({ children }) => React.createElement('div', { 'data-testid': 'section' }, children)
})

jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    t: (key, fallback) => fallback || key
  })
}))

describe('Home Page', () => {
  it('renders main heading', () => {
    render(<Home />)
    
    const heading = screen.getByRole('heading', { name: /Alvaro peña/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays professional title', () => {
    render(<Home />)
    
    // Buscamos el texto directamente en lugar de por testid para evitar múltiples matches
    expect(screen.getByText('Backend-focused Full Stack Developer')).toBeInTheDocument()
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
    
    const experienceHeading = screen.getByRole('heading', { name: /experiencia/i })
    expect(experienceHeading).toBeInTheDocument()
  })

  it('displays contact information', () => {
    render(<Home />)
    
    const contactHeading = screen.getByRole('heading', { name: /contacto/i })
    expect(contactHeading).toBeInTheDocument()
  })

  it('has link to projects', () => {
    render(<Home />)
    
    const projectsButton = screen.getByRole('button', { name: /ver proyectos/i })
    expect(projectsButton).toBeInTheDocument()
    expect(projectsButton).toHaveAttribute('href', '/works')
  })

  it('shows professional experience timeline', () => {
    render(<Home />)
    
    const experienceSection = screen.getByRole('heading', { name: /experiencia/i }).closest('[data-testid="section"]')
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
