/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '../../components/ContactForm'

// Mock fetch for API route
const mockFetch = jest.fn()
global.fetch = mockFetch

// Mock ChakraUI components
jest.mock('@chakra-ui/react', () => {
  const React = require('react')

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
      'disabled',
      'type',
      'name',
      'value',
      'placeholder',
      'onChange',
      'onSubmit',
      'required',
      'maxLength',
      'rows'
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
    useColorModeValue: () => 'white',
    Box: ({ children, as = 'div', onSubmit, ...allProps }) => {
      const domProps = filterDOMProps({ onSubmit, ...allProps })
      if (as === 'form') {
        return React.createElement('form', domProps, children)
      }
      return React.createElement('div', domProps, children)
    },
    VStack: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement('div', domProps, children)
    },
    FormControl: ({ children, isRequired, ...allProps }) => {
      const domProps = filterDOMProps({
        ...allProps,
        'data-required': isRequired
      })
      return React.createElement('div', domProps, children)
    },
    FormLabel: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement('div', domProps, children)
    },
    Input: ({ ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement('input', {
        'data-testid': 'email-input',
        ...domProps
      })
    },
    Textarea: ({ ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement('textarea', {
        'data-testid': 'message-input',
        ...domProps
      })
    },
    Button: ({ children, isLoading, loadingText, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      if (isLoading) {
        return React.createElement(
          'button',
          {
            ...domProps,
            disabled: true,
            'data-testid': 'submit-button'
          },
          loadingText || children
        )
      }
      return React.createElement(
        'button',
        {
          ...domProps,
          'data-testid': 'submit-button'
        },
        children
      )
    },
    Alert: ({ children, status, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement(
        'div',
        {
          ...domProps,
          'data-testid': `alert-${status}`
        },
        children
      )
    },
    AlertIcon: () => React.createElement('span', {}, '!'),
    Text: ({ children, as = 'span', ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return React.createElement(as, domProps, children)
    }
  }
})

// Mock i18n
jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    t: (key, defaultValue) => defaultValue || key
  })
}))

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true })
    })
  })

  it('renders contact form with all fields', () => {
    render(<ContactForm />)

    expect(screen.getByTestId('email-input')).toBeInTheDocument()
    expect(screen.getByTestId('message-input')).toBeInTheDocument()
    expect(screen.getByTestId('submit-button')).toBeInTheDocument()
  })

  it('shows optional text for email', () => {
    render(<ContactForm />)

    expect(screen.getByText(/opcional/)).toBeInTheDocument()
  })

  it('disables submit button when message is empty', () => {
    render(<ContactForm />)

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toBeDisabled()
  })

  it('enables submit button when message has content', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const messageField = screen.getByTestId('message-input')

    await user.type(messageField, 'Hello, this is a test message')

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).not.toBeDisabled()
  })

  it('handles form submission successfully', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const emailField = screen.getByTestId('email-input')
    const messageField = screen.getByTestId('message-input')
    const submitButton = screen.getByTestId('submit-button')

    await user.type(emailField, 'test@example.com')
    await user.type(messageField, 'Test message')
    await user.click(submitButton)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/contact',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId('alert-success')).toBeInTheDocument()
    })
  })

  it('handles form submission error', async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 })

    // Silence console.error for this test
    const originalConsoleError = console.error
    console.error = jest.fn()

    const user = userEvent.setup()
    render(<ContactForm />)

    const messageField = screen.getByTestId('message-input')
    const submitButton = screen.getByTestId('submit-button')

    await user.type(messageField, 'Test message')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByTestId('alert-error')).toBeInTheDocument()
    })

    // Restore console.error
    console.error = originalConsoleError
  })

  it('enforces 500 character limit on message', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const messageField = screen.getByTestId('message-input')
    const longMessage = 'a'.repeat(510) // 510 characters, should be truncated to 500

    await user.type(messageField, longMessage)

    expect(messageField.value).toHaveLength(500)
    expect(screen.getByText('500/500')).toBeInTheDocument()
  })

  it('clears form after successful submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    const emailField = screen.getByTestId('email-input')
    const messageField = screen.getByTestId('message-input')
    const submitButton = screen.getByTestId('submit-button')

    await user.type(emailField, 'test@example.com')
    await user.type(messageField, 'Test message')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByTestId('alert-success')).toBeInTheDocument()
    })

    expect(emailField.value).toBe('')
    expect(messageField.value).toBe('')
  })
})
