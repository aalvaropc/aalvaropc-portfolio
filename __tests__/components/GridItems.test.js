import { render, screen } from '@testing-library/react'
import React from 'react'
import { GridItem, WorkGridItem, PostGridItem, GridItemStyle } from '../../components/grid-items.js'

// Helper function to filter DOM props
const filterDOMProps = (props) => {
  const domProps = {}
  Object.keys(props).forEach(key => {
    if (
      key.startsWith('data-') ||
      key.startsWith('aria-') ||
      ['id', 'className', 'style', 'onClick', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur', 'href', 'target', 'rel', 'role'].includes(key)
    ) {
      domProps[key] = props[key]
    }
  })
  return domProps
}

// Mock Next.js components
jest.mock('next/link', () => {
  const React = require('react')
  
  const MockNextLink = React.forwardRef((props, ref) => {
    const InnerMockNextLink = ({ children, href, ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement('a', { 
        ...domProps, 
        href,
        'data-testid': 'next-link',
        ref 
      }, children)
    }
    InnerMockNextLink.displayName = 'NextLink'
    return React.createElement(InnerMockNextLink, props)
  })
  MockNextLink.displayName = 'MockNextLink'
  
  return MockNextLink
})

jest.mock('next/image', () => {
  const React = require('react')
  
  const MockImage = React.forwardRef((props, ref) => {
    const InnerMockImage = ({ src, alt, ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement('img', { 
        ...domProps, 
        src,
        alt,
        'data-testid': 'next-image',
        ref 
      })
    }
    InnerMockImage.displayName = 'Image'
    return React.createElement(InnerMockImage, props)
  })
  MockImage.displayName = 'MockImage'
  
  return MockImage
})

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

  const MockText = React.forwardRef((props, ref) => {
    const InnerMockText = ({ children, ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement('p', { 
        ...domProps, 
        'data-testid': 'chakra-text',
        ref 
      }, children)
    }
    InnerMockText.displayName = 'Text'
    return React.createElement(InnerMockText, props)
  })
  MockText.displayName = 'MockText'

  const MockLinkBox = React.forwardRef((props, ref) => {
    const InnerMockLinkBox = ({ children, ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement('div', { 
        ...domProps, 
        'data-testid': 'chakra-linkbox',
        ref 
      }, children)
    }
    InnerMockLinkBox.displayName = 'LinkBox'
    return React.createElement(InnerMockLinkBox, props)
  })
  MockLinkBox.displayName = 'MockLinkBox'

  const MockLinkOverlay = React.forwardRef((props, ref) => {
    const InnerMockLinkOverlay = ({ children, as: Component = 'a', ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement(Component || 'a', { 
        ...domProps, 
        'data-testid': 'chakra-linkoverlay',
        ref 
      }, children)
    }
    InnerMockLinkOverlay.displayName = 'LinkOverlay'
    return React.createElement(InnerMockLinkOverlay, props)
  })
  MockLinkOverlay.displayName = 'MockLinkOverlay'

  return {
    Box: MockBox,
    Text: MockText,
    LinkBox: MockLinkBox,
    LinkOverlay: MockLinkOverlay
  }
})

// Mock Emotion React
jest.mock('@emotion/react', () => {
  const React = require('react')
  
  const MockGlobal = React.forwardRef((props, ref) => {
    const InnerMockGlobal = () => React.createElement('style', { 
      'data-testid': 'emotion-global',
      ref 
    })
    InnerMockGlobal.displayName = 'Global'
    return React.createElement(InnerMockGlobal, props)
  })
  MockGlobal.displayName = 'MockGlobal'

  return {
    Global: MockGlobal
  }
})

describe('Grid Items Components', () => {
  describe('GridItem', () => {
    const mockProps = {
      href: 'https://example.com',
      title: 'Test Title',
      thumbnail: '/test-image.jpg',
      children: 'Test description'
    }

    it('renders grid item with correct structure', () => {
      render(React.createElement(GridItem, mockProps))
      
      expect(screen.getAllByTestId('chakra-box')).toHaveLength(2) // Container and image wrapper
      expect(screen.getByTestId('chakra-linkbox')).toBeInTheDocument()
      expect(screen.getByTestId('next-image')).toBeInTheDocument()
      expect(screen.getByTestId('chakra-linkoverlay')).toBeInTheDocument()
    })

    it('displays correct title and description', () => {
      render(React.createElement(GridItem, mockProps))
      
      expect(screen.getByText('Test Title')).toBeInTheDocument()
      expect(screen.getByText('Test description')).toBeInTheDocument()
    })

    it('renders image with correct props', () => {
      render(React.createElement(GridItem, mockProps))
      
      const image = screen.getByTestId('next-image')
      expect(image).toHaveAttribute('src', '/test-image.jpg')
      expect(image).toHaveAttribute('alt', 'Test Title')
    })

    it('renders link with correct href', () => {
      render(React.createElement(GridItem, mockProps))
      
      const link = screen.getByTestId('chakra-linkoverlay')
      expect(link).toHaveAttribute('href', 'https://example.com')
    })
  })

  describe('WorkGridItem', () => {
    const mockProps = {
      id: 'test-work',
      title: 'Test Work',
      thumbnail: '/test-work.jpg',
      children: 'Work description'
    }

    it('renders work grid item with correct structure', () => {
      render(React.createElement(WorkGridItem, mockProps))
      
      expect(screen.getAllByTestId('chakra-box')).toHaveLength(2) // Container and image wrapper
      expect(screen.getByTestId('chakra-linkbox')).toBeInTheDocument()
      expect(screen.getByTestId('next-image')).toBeInTheDocument()
    })

    it('displays correct work title and description', () => {
      render(React.createElement(WorkGridItem, mockProps))
      
      expect(screen.getByText('Test Work')).toBeInTheDocument()
      expect(screen.getByText('Work description')).toBeInTheDocument()
    })

    it('renders image with project alt text', () => {
      render(React.createElement(WorkGridItem, mockProps))
      
      const image = screen.getByTestId('next-image')
      expect(image).toHaveAttribute('alt', 'Proyecto: Test Work')
    })

    it('renders internal link to work page', () => {
      render(React.createElement(WorkGridItem, mockProps))
      
      const link = screen.getByTestId('next-link')
      expect(link).toHaveAttribute('href', '/works/test-work')
    })
  })

  describe('PostGridItem', () => {
    const mockProps = {
      id: 'test-post',
      title: 'Test Post',
      thumbnail: '/test-post.jpg',
      children: 'Post description'
    }

    it('renders post grid item with correct structure', () => {
      render(React.createElement(PostGridItem, mockProps))
      
      expect(screen.getAllByTestId('chakra-box')).toHaveLength(2) // Container and image wrapper
      expect(screen.getByTestId('chakra-linkbox')).toBeInTheDocument()
      expect(screen.getByTestId('next-image')).toBeInTheDocument()
    })

    it('displays correct post title and description', () => {
      render(React.createElement(PostGridItem, mockProps))
      
      expect(screen.getByText('Test Post')).toBeInTheDocument()
      expect(screen.getByText('Post description')).toBeInTheDocument()
    })

    it('renders image with post alt text', () => {
      render(React.createElement(PostGridItem, mockProps))
      
      const image = screen.getByTestId('next-image')
      expect(image).toHaveAttribute('alt', 'Publicación: Test Post')
    })

    it('renders internal link to post page', () => {
      render(React.createElement(PostGridItem, mockProps))
      
      const link = screen.getByTestId('next-link')
      expect(link).toHaveAttribute('href', '/posts/test-post')
    })
  })

  describe('GridItemStyle', () => {
    it('renders global styles component', () => {
      render(React.createElement(GridItemStyle))
      
      expect(screen.getByTestId('emotion-global')).toBeInTheDocument()
    })
  })
})