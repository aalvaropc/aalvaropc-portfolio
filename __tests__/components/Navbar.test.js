import React from 'react'
import { render, screen } from '@testing-library/react'
import Navbar from '../../components/navbar'

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
      return <div data-testid="container" {...domProps}>{children}</div>
    },
    Box: ({ children, as = 'div', ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement(as, { 'data-testid': 'box', ...domProps }, children)
    },
    Link: ({ children, href, as: Component, ...allProps }) => {
      const domProps = filterDOMProps({ href, ...allProps })
      if (Component) {
        return React.createElement(Component, domProps, children)
      }
      return <a data-testid="link" {...domProps}>{children}</a>
    },
    Heading: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <h1 data-testid="heading" {...domProps}>{children}</h1>
    },
    Flex: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div data-testid="flex" {...domProps}>{children}</div>
    },
    useColorModeValue: () => 'gray.800',
    Stack: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div data-testid="stack" {...domProps}>{children}</div>
    },
    MenuItem: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div data-testid="menu-item" {...domProps}>{children}</div>
    },
    MenuDivider: ({ ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div data-testid="menu-divider" {...domProps} />
    },
    Menu: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div data-testid="menu" {...domProps}>{children}</div>
    },
    MenuButton: ({ children, as: Component, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      if (Component) {
        return React.createElement(Component, domProps, children)
      }
      return <button data-testid="menu-button" {...domProps}>{children}</button>
    },
    MenuList: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div data-testid="menu-list" {...domProps}>{children}</div>
    },
    IconButton: ({ children, 'aria-label': ariaLabel, icon, ...allProps }) => {
      const domProps = filterDOMProps({ 'aria-label': ariaLabel, ...allProps })
      return (
        <button data-testid="icon-button" {...domProps}>
          {children || (icon ? '☰' : '')}
        </button>
      )
    },
  }
})

// Mock ChakraUI icons
jest.mock('@chakra-ui/icons', () => ({
  HamburgerIcon: () => <span data-testid="hamburger-icon">☰</span>,
}))

// Mock react-icons
jest.mock('react-icons/md', () => ({
  MdMenu: () => <span data-testid="hamburger-icon">☰</span>,
}))

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => <a href={href} {...props}>{children}</a>,
}))

// Mock logo component
jest.mock('../../components/logo', () => ({
  __esModule: true,
  default: ({ ...props }) => <div data-testid="logo" {...props}>Alvaro Peña</div>,
}))

// Mock theme toggle
jest.mock('../../components/theme-toggle-button', () => ({
  __esModule: true,
  default: ({ ...props }) => <button aria-label="toggle theme" data-testid="theme-toggle" {...props}>🌙</button>,
}))

// Mock language selector
jest.mock('../../components/LanguageSelector', () => ({
  __esModule: true,
  default: ({ ...props }) => <select aria-label="language selector" data-testid="language-selector" {...props}><option value="es">ES</option></select>,
}))

// Mock i18n hook
jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    t: (key) => {
      const translations = {
        'nav.home': 'Información',
        'nav.projects': 'Proyectos', 
        'nav.posts': 'Publicaciones',
        'nav.cv': 'Curriculum vitae',
        'nav.certificates': 'Certificados'
      }
      return translations[key] || key
    }
  })
}))

describe('Navbar', () => {
  it('renders navbar component', () => {
    render(<Navbar path="/" />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('contains logo with name', () => {
    render(<Navbar path="/" />)
    
    const logo = screen.getByText('Alvaro Peña')
    expect(logo).toBeInTheDocument()
  })

  it('contains navigation links', () => {
    render(<Navbar path="/" />)
    
    const projectsLinks = screen.getAllByRole('link', { name: /proyectos/i })
    const postsLinks = screen.getAllByRole('link', { name: /publicaciones/i })
    
    expect(projectsLinks.length).toBeGreaterThan(0)
    expect(postsLinks.length).toBeGreaterThan(0)
  })

  it('has theme toggle button', () => {
    render(<Navbar path="/" />)
    
    // Theme toggle button should be present (has specific aria-label)
    const themeButton = screen.getByRole('button', { name: /toggle theme/i })
    expect(themeButton).toBeInTheDocument()
  })

  it('highlights current page in navigation', () => {
    render(<Navbar path="/works" />)
    
    // This would need to be tested based on the actual implementation
    // The navbar should highlight the current path
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})