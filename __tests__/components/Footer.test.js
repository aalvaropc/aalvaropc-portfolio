import { render, screen } from '@testing-library/react'
import Footer from '../../components/Footer.js'

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
    Box: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div {...domProps}>{children}</div>
    },
    Text: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <span {...domProps}>{children}</span>
    },
    HStack: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div {...domProps}>{children}</div>
    },
    Link: ({ children, href, ...allProps }) => {
      const domProps = filterDOMProps({ href, ...allProps })
      return <a {...domProps}>{children}</a>
    },
    Icon: ({ as: IconComponent, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <IconComponent {...domProps} />
    }
  }
})

// Mock simple para react-icons para este test específico
jest.mock('react-icons/fa', () => ({
  FaGithub: (props) => <span {...props} data-testid="github-icon">GitHub</span>,
  FaLinkedin: (props) => <span {...props} data-testid="linkedin-icon">LinkedIn</span>,
  FaTwitter: (props) => <span {...props} data-testid="twitter-icon">Twitter</span>,
  FaEnvelope: (props) => <span {...props} data-testid="email-icon">Email</span>
}))

describe('Footer', () => {
  it('renders footer component', () => {
    render(<Footer />)
    
    const footer = screen.getByText(/© 2025 Alvaro Peña/)
    expect(footer).toBeInTheDocument()
  })

  it('displays current year in copyright', () => {
    render(<Footer />)
    
    const currentYear = new Date().getFullYear()
    const copyrightText = screen.getByText(new RegExp(`© ${currentYear} Alvaro Peña`))
    expect(copyrightText).toBeInTheDocument()
  })

  it('contains GitHub link', () => {
    render(<Footer />)
    
    const links = screen.getAllByRole('link')
    const githubLink = links.find(link => link.getAttribute('href') === 'https://github.com/aalvaropc')
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/aalvaropc')
  })

  it('contains LinkedIn link', () => {
    render(<Footer />)
    
    const links = screen.getAllByRole('link')
    const linkedinLink = links.find(link => link.getAttribute('href') === 'https://linkedin.com/in/alvaro-pena-carrera')
    expect(linkedinLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/alvaro-pena-carrera')
  })

  it('contains Twitter link', () => {
    render(<Footer />)
    
    const links = screen.getAllByRole('link')
    const twitterLink = links.find(link => link.getAttribute('href') === 'https://twitter.com/aalvaropc')
    expect(twitterLink).toBeInTheDocument()
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/aalvaropc')
  })

  it('contains Email link', () => {
    render(<Footer />)
    
    const links = screen.getAllByRole('link')
    const emailLink = links.find(link => link.getAttribute('href') === 'mailto:alvaro@example.com')
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:alvaro@example.com')
  })

  it('has proper accessibility attributes', () => {
    render(<Footer />)
    
    const socialLinks = screen.getAllByRole('link')
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('href')
    })
  })
})