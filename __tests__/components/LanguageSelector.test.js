/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LanguageSelector from '../../components/LanguageSelector'

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
    Menu: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div data-testid="language-menu" {...domProps}>{children}</div>
    },
    MenuButton: ({ children, as: Component, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      if (Component) {
        return React.createElement(Component, { 'data-testid': 'language-button', ...domProps }, children)
      }
      return <button data-testid="language-button" {...domProps}>{children}</button>
    },
    MenuList: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div data-testid="menu-list" {...domProps}>{children}</div>
    },
    MenuItem: ({ children, onClick, ...allProps }) => {
      const domProps = filterDOMProps({ onClick, ...allProps })
      return <button data-testid="menu-item" {...domProps}>{children}</button>
    },
    Button: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <button data-testid="button" {...domProps}>{children}</button>
    },
    Spinner: ({ ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div data-testid="spinner" {...domProps}>Loading...</div>
    },
    Box: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div data-testid="box" {...domProps}>{children}</div>
    },
  }
})

// Mock ChakraUI icons
jest.mock('@chakra-ui/icons', () => ({
  ChevronDownIcon: () => <span data-testid="chevron-down">▼</span>,
}))

// Mock i18n context
jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    locale: 'es',
    changeLocale: jest.fn(),
    supportedLocales: ['es', 'en'],
    isLoading: false,
  })
}))

// Mock fetch for translations
global.fetch = jest.fn()

const mockTranslations = {
  es: {
    common: {
      hero: { greeting: 'Hola' },
      nav: { home: 'Inicio' }
    }
  },
  en: {
    common: {
      hero: { greeting: 'Hello' },
      nav: { home: 'Home' }
    }
  }
}

describe('Internationalization System', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear()
    
    // Mock successful fetch responses
    fetch.mockImplementation((url) => {
      const lang = url.includes('/es/') ? 'es' : 'en'
      
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTranslations[lang] || {})
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders language selector with default Spanish flag', () => {
    render(<LanguageSelector />)

    // The Spanish flag should be displayed in the button (use testid to be specific)
    expect(screen.getByTestId('language-button')).toBeInTheDocument()
    // Verify Spanish flag appears in button
    const allFlags = screen.getAllByText(/🇪🇸/)
    expect(allFlags.length).toBeGreaterThan(0)
  })

  it('shows language menu when clicked', async () => {
    const user = userEvent.setup()
    
    render(<LanguageSelector />)

    // Click on language selector button
    await user.click(screen.getByTestId('language-button'))
    
    // Verify menu items are displayed using getAllByText to handle multiple instances
    expect(screen.getByText(/🇪🇸 Español/)).toBeInTheDocument()
    expect(screen.getByText(/🇺🇸 English/)).toBeInTheDocument()
  })

  it('renders menu items correctly', () => {
    render(<LanguageSelector />)

    // Language menu should render
    expect(screen.getByTestId('language-menu')).toBeInTheDocument()
    expect(screen.getByTestId('language-button')).toBeInTheDocument()
    
    // Menu items should be available
    const menuItems = screen.getAllByTestId('menu-item')
    expect(menuItems).toHaveLength(2)
  })

  it('shows correct structure', () => {
    render(<LanguageSelector />)

    // Verify the selector components are functional
    expect(screen.getByTestId('language-button')).toBeInTheDocument()
    expect(screen.getByTestId('language-menu')).toBeInTheDocument()
    expect(screen.getByTestId('menu-list')).toBeInTheDocument()
  })

  it('contains language options', () => {
    render(<LanguageSelector />)

    // Should show both language options in the menu
    expect(screen.getByText(/Español/)).toBeInTheDocument()
    expect(screen.getByText(/English/)).toBeInTheDocument()
  })
})
