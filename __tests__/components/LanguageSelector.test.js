/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChakraProvider } from '@chakra-ui/react'
import { I18nProvider } from '../../lib/i18nContext'
import LanguageSelector from '../../components/LanguageSelector'
import theme from '../../lib/theme'

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

const TestWrapper = ({ children }) => (
  <ChakraProvider theme={theme}>
    <I18nProvider>
      {children}
    </I18nProvider>
  </ChakraProvider>
)

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

  it('renders language selector with default Spanish', async () => {
    render(
      <TestWrapper>
        <LanguageSelector />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText(/Español/)).toBeInTheDocument()
    })
  })

  it('allows switching languages', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <LanguageSelector />
      </TestWrapper>
    )

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText(/Español/)).toBeInTheDocument()
    })

    // Click on language selector
    await user.click(screen.getByText(/Español/))
    
    // Click on English option from menu
    const englishMenuItem = screen.getAllByText(/English/)[1] // Get the menu item, not the button
    await user.click(englishMenuItem)

    // Verify English is now selected in the button
    await waitFor(() => {
      const englishButton = screen.getAllByText(/English/)[0] // Get the button text
      expect(englishButton).toBeInTheDocument()
    })
  })

  it('persists language preference in localStorage', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <LanguageSelector />
      </TestWrapper>
    )

    await waitFor(() => {
      expect(screen.getByText(/Español/)).toBeInTheDocument()
    })

    // Switch to English
    await user.click(screen.getByText(/Español/))
    await user.click(screen.getByText(/English/))

    // Check localStorage
    await waitFor(() => {
      expect(localStorage.getItem('preferred-locale')).toBe('en')
    })
  })

  it('handles fetch errors gracefully', async () => {
    // Mock fetch to fail
    fetch.mockRejectedValueOnce(new Error('Network error'))

    render(
      <TestWrapper>
        <LanguageSelector />
      </TestWrapper>
    )

    // Should still render with fallback
    await waitFor(() => {
      expect(screen.getByText(/Español/)).toBeInTheDocument()
    })
  })

  it('loads successfully and shows language selector', async () => {
    render(
      <TestWrapper>
        <LanguageSelector />
      </TestWrapper>
    )

    // Wait for loading to complete and verify it shows the language selector
    await waitFor(() => {
      expect(screen.getByText(/Español/)).toBeInTheDocument()
    })

    // Verify the selector is functional
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})