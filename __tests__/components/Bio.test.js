import { render, screen } from '@testing-library/react'
import React from 'react'
import { BioSection, BioYear } from '../../components/bio.js'

// Helper function to filter DOM props
const filterDOMProps = (props) => {
  const domProps = {}
  Object.keys(props).forEach(key => {
    if (
      key.startsWith('data-') ||
      key.startsWith('aria-') ||
      ['id', 'className', 'style'].includes(key)
    ) {
      domProps[key] = props[key]
    }
  })
  return domProps
}

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => {
  const React = require('react')
  
  const MockBox = React.forwardRef((props, ref) => {
    const InnerMockBox = ({ children, ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement('div', { 
        ...domProps, 
        'data-testid': 'chakra-box',
        ref 
      }, children)
    }
    InnerMockBox.displayName = 'Box'
    return React.createElement(InnerMockBox, props)
  })
  MockBox.displayName = 'MockBox'

  return {
    Box: MockBox
  }
})

// Mock emotion/styled
jest.mock('@emotion/styled', () => {
  const React = require('react')
  
  const mockStyled = (Component) => {
    const MockStyledComponent = React.forwardRef((props, ref) => {
      const StyledComponent = ({ children, ...rest }) => {
        const domProps = filterDOMProps(rest)
        return React.createElement(Component, { 
          ...domProps, 
          'data-testid': 'styled-component',
          ref 
        }, children)
      }
      StyledComponent.displayName = 'StyledComponent'
      return React.createElement(StyledComponent, props)
    })
    MockStyledComponent.displayName = 'MockStyledComponent'
    
    // Return a function that accepts template literal
    return (_templateLiteral) => MockStyledComponent
  }
  
  const MockStyledSpan = React.forwardRef((props, ref) => {
    const StyledSpan = ({ children, ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement('span', { 
        ...domProps, 
        'data-testid': 'styled-span',
        ref 
      }, children)
    }
    StyledSpan.displayName = 'StyledSpan'
    return React.createElement(StyledSpan, props)
  })
  MockStyledSpan.displayName = 'MockStyledSpan'

  mockStyled.span = (_templateLiteral) => MockStyledSpan

  return mockStyled
})

describe('Bio Components', () => {
  describe('BioSection', () => {
    it('renders bio section with children', () => {
      render(React.createElement(BioSection, null, 'Bio content'))
      
      expect(screen.getByTestId('chakra-box')).toBeInTheDocument()
      expect(screen.getByText('Bio content')).toBeInTheDocument()
    })

    it('accepts additional props', () => {
      render(React.createElement(BioSection, { 
        className: 'bio-section'
      }, 'Bio content'))
      
      const bioSection = screen.getByTestId('chakra-box')
      expect(bioSection).toBeInTheDocument()
      expect(bioSection).toHaveClass('bio-section')
    })

    it('renders as a container element', () => {
      render(React.createElement(BioSection, null, 'Test'))
      
      // Verifies that it renders as a container
      const container = screen.getByTestId('chakra-box')
      expect(container).toBeInTheDocument()
      expect(container.tagName).toBe('DIV')
    })
  })

  describe('BioYear', () => {
    it('renders bio year with children', () => {
      render(React.createElement(BioYear, null, '2024'))
      
      expect(screen.getByTestId('styled-span')).toBeInTheDocument()
      expect(screen.getByText('2024')).toBeInTheDocument()
    })

    it('accepts additional props', () => {
      render(React.createElement(BioYear, { 
        className: 'bio-year'
      }, '2024'))
      
      const bioYear = screen.getByTestId('styled-span')
      expect(bioYear).toBeInTheDocument()
      expect(bioYear).toHaveClass('bio-year')
    })

    it('renders as span element', () => {
      render(React.createElement(BioYear, null, '2024'))
      
      const spanElement = screen.getByTestId('styled-span')
      expect(spanElement.tagName).toBe('SPAN')
    })
  })

  describe('Integration', () => {
    it('renders bio section with bio year inside', () => {
      render(
        React.createElement(BioSection, null, [
          React.createElement(BioYear, { key: 'year' }, '2024'),
          ' Started career in development'
        ])
      )
      
      expect(screen.getByTestId('chakra-box')).toBeInTheDocument()
      expect(screen.getByTestId('styled-span')).toBeInTheDocument()
      expect(screen.getByText('2024')).toBeInTheDocument()
      expect(screen.getByText('Started career in development')).toBeInTheDocument()
    })
  })
})