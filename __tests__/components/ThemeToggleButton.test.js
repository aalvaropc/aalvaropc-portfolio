import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'

// Helper function to filter DOM props
const filterDOMProps = (props) => {
  const domProps = {}
  Object.keys(props).forEach(key => {
    if (
      key.startsWith('data-') ||
      key.startsWith('aria-') ||
      ['id', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'].includes(key)
    ) {
      domProps[key] = props[key]
    }
  })
  return domProps
}

const mockToggleColorMode = jest.fn()

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => {
  const React = require('react')
  
  const MockIconButton = React.forwardRef((props, ref) => {
    const InnerMockIconButton = ({ children, icon, ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement('button', { 
        ...domProps, 
        'data-testid': 'icon-button',
        ref 
      }, [React.createElement('span', { key: 'icon' }, icon), React.createElement('span', { key: 'children' }, children)])
    }
    InnerMockIconButton.displayName = 'IconButton'
    return React.createElement(InnerMockIconButton, props)
  })
  MockIconButton.displayName = 'MockIconButton'

  return {
    ChakraProvider: ({ children }) => React.createElement('div', { 'data-testid': 'chakra-provider' }, children),
    IconButton: MockIconButton,
    useColorMode: () => ({
      colorMode: 'light',
      toggleColorMode: mockToggleColorMode
    }),
    useColorModeValue: (lightValue, _darkValue) => lightValue
  }
})

// Mock Chakra UI icons
jest.mock('@chakra-ui/icons', () => {
  const React = require('react')
  
  const MockSunIcon = React.forwardRef((props, ref) => {
    const InnerMockSunIcon = () => React.createElement('svg', { 
      'data-testid': 'sun-icon',
      ref 
    })
    InnerMockSunIcon.displayName = 'SunIcon'
    return React.createElement(InnerMockSunIcon, props)
  })
  MockSunIcon.displayName = 'MockSunIcon'

  const MockMoonIcon = React.forwardRef((props, ref) => {
    const InnerMockMoonIcon = () => React.createElement('svg', { 
      'data-testid': 'moon-icon',
      ref 
    })
    InnerMockMoonIcon.displayName = 'MoonIcon'
    return React.createElement(InnerMockMoonIcon, props)
  })
  MockMoonIcon.displayName = 'MockMoonIcon'

  return {
    SunIcon: MockSunIcon,
    MoonIcon: MockMoonIcon
  }
})

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react')
  
  const MockMotionDiv = React.forwardRef((props, ref) => {
    const InnerMockMotionDiv = ({ children, ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement('div', { 
        ...domProps, 
        'data-testid': 'motion-div',
        ref 
      }, children)
    }
    InnerMockMotionDiv.displayName = 'MotionDiv'
    return React.createElement(InnerMockMotionDiv, props)
  })
  MockMotionDiv.displayName = 'MockMotionDiv'

  return {
    AnimatePresence: ({ children }) => React.createElement('div', { 'data-testid': 'animate-presence' }, children),
    motion: {
      div: MockMotionDiv
    }
  }
})

import { ChakraProvider } from '@chakra-ui/react'
import ThemeToggleButton from '../../components/theme-toggle-button.jsx'

const renderWithChakra = (component) => {
  return render(
    React.createElement(ChakraProvider, null, component)
  )
}

describe('ThemeToggleButton', () => {
  it('renders theme toggle button', () => {
    renderWithChakra(React.createElement(ThemeToggleButton))
    
    expect(screen.getByTestId('icon-button')).toBeInTheDocument()
  })

  it('displays correct icon for light mode', () => {
    renderWithChakra(React.createElement(ThemeToggleButton))
    
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    renderWithChakra(React.createElement(ThemeToggleButton))
    
    const button = screen.getByTestId('icon-button')
    expect(button).toHaveAttribute('aria-label', 'Toggle theme')
  })

  it('renders with proper animation wrapper', () => {
    renderWithChakra(React.createElement(ThemeToggleButton))
    
    expect(screen.getByTestId('animate-presence')).toBeInTheDocument()
    expect(screen.getByTestId('motion-div')).toBeInTheDocument()
  })

  it('calls toggleColorMode when clicked', () => {
    renderWithChakra(React.createElement(ThemeToggleButton))
    
    const button = screen.getByTestId('icon-button')
    fireEvent.click(button)
    
    expect(mockToggleColorMode).toHaveBeenCalledTimes(1)
  })

  it('renders with proper structure', () => {
    renderWithChakra(React.createElement(ThemeToggleButton))
    
    const animatePresence = screen.getByTestId('animate-presence')
    const motionDiv = screen.getByTestId('motion-div')
    const iconButton = screen.getByTestId('icon-button')
    
    expect(animatePresence).toContainElement(motionDiv)
    expect(motionDiv).toContainElement(iconButton)
  })
})