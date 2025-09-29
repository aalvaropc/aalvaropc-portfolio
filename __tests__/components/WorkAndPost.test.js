import { render, screen } from '@testing-library/react'
import React from 'react'

// Helper function to filter DOM props
const filterDOMProps = (props) => {
  const domProps = {}
  Object.keys(props).forEach(key => {
    if (
      key.startsWith('data-') ||
      key.startsWith('aria-') ||
      ['id', 'className', 'style', 'href', 'src', 'alt'].includes(key)
    ) {
      domProps[key] = props[key]
    }
  })
  return domProps
}

// Mock Next.js Link
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

  const MockHeading = React.forwardRef((props, ref) => {
    const InnerMockHeading = ({ children, as = 'h1', ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement(as, { 
        ...domProps, 
        'data-testid': 'chakra-heading',
        ref 
      }, children)
    }
    InnerMockHeading.displayName = 'Heading'
    return React.createElement(InnerMockHeading, props)
  })
  MockHeading.displayName = 'MockHeading'

  const MockImage = React.forwardRef((props, ref) => {
    const InnerMockImage = ({ src, alt, ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement('img', { 
        ...domProps, 
        src,
        alt,
        'data-testid': 'chakra-image',
        ref 
      })
    }
    InnerMockImage.displayName = 'Image'
    return React.createElement(InnerMockImage, props)
  })
  MockImage.displayName = 'MockImage'

  const MockLink = React.forwardRef((props, ref) => {
    const InnerMockLink = ({ children, as: Component = 'a', ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement(Component || 'a', { 
        ...domProps, 
        'data-testid': 'chakra-link',
        ref 
      }, children)
    }
    InnerMockLink.displayName = 'Link'
    return React.createElement(InnerMockLink, props)
  })
  MockLink.displayName = 'MockLink'

  const MockBadge = React.forwardRef((props, ref) => {
    const InnerMockBadge = ({ children, ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement('span', { 
        ...domProps, 
        'data-testid': 'chakra-badge',
        ref 
      }, children)
    }
    InnerMockBadge.displayName = 'Badge'
    return React.createElement(InnerMockBadge, props)
  })
  MockBadge.displayName = 'MockBadge'

  return {
    Box: MockBox,
    Heading: MockHeading,
    Image: MockImage,
    Link: MockLink,
    Badge: MockBadge
  }
})

// Mock Chakra UI icons
jest.mock('@chakra-ui/icons', () => {
  const React = require('react')
  
  const MockChevronRightIcon = React.forwardRef((props, ref) => {
    const InnerMockChevronRightIcon = () => React.createElement('svg', { 
      'data-testid': 'chevron-right-icon',
      ref 
    })
    InnerMockChevronRightIcon.displayName = 'ChevronRightIcon'
    return React.createElement(InnerMockChevronRightIcon, props)
  })
  MockChevronRightIcon.displayName = 'MockChevronRightIcon'

  return {
    ChevronRightIcon: MockChevronRightIcon
  }
})

// Import components after mocks
import { Title as WorkTitle, WorkImage, Meta as WorkMeta } from '../../components/work.js'
import { Title as PostTitle, PostImage, Meta as PostMeta } from '../../components/post.js'

describe('Work Components', () => {
  describe('WorkTitle', () => {
    it('renders work title with navigation', () => {
      render(React.createElement(WorkTitle, null, 'Test Work'))
      
      expect(screen.getByTestId('chakra-box')).toBeInTheDocument()
      expect(screen.getByText('Proyectos')).toBeInTheDocument()
      expect(screen.getByText('Test Work')).toBeInTheDocument()
      expect(screen.getByTestId('chevron-right-icon')).toBeInTheDocument()
    })

    it('renders link to works page', () => {
      render(React.createElement(WorkTitle, null, 'Test Work'))
      
      const link = screen.getByTestId('next-link')
      expect(link).toHaveAttribute('href', '/works')
    })

    it('renders heading with correct tag', () => {
      render(React.createElement(WorkTitle, null, 'Test Work'))
      
      const heading = screen.getByTestId('chakra-heading')
      expect(heading.tagName).toBe('H3')
    })
  })

  describe('WorkImage', () => {
    const mockProps = {
      src: '/test-image.jpg',
      alt: 'Test image'
    }

    it('renders work image with correct props', () => {
      render(React.createElement(WorkImage, mockProps))
      
      const image = screen.getByTestId('chakra-image')
      expect(image).toHaveAttribute('src', '/test-image.jpg')
      expect(image).toHaveAttribute('alt', 'Test image')
    })

    it('renders image element', () => {
      render(React.createElement(WorkImage, mockProps))
      
      const image = screen.getByTestId('chakra-image')
      expect(image.tagName).toBe('IMG')
    })
  })

  describe('WorkMeta', () => {
    it('renders work meta badge', () => {
      render(React.createElement(WorkMeta, null, 'React'))
      
      expect(screen.getByTestId('chakra-badge')).toBeInTheDocument()
      expect(screen.getByText('React')).toBeInTheDocument()
    })

    it('renders as span element', () => {
      render(React.createElement(WorkMeta, null, 'React'))
      
      const badge = screen.getByTestId('chakra-badge')
      expect(badge.tagName).toBe('SPAN')
    })
  })
})

describe('Post Components', () => {
  describe('PostTitle', () => {
    it('renders post title with navigation', () => {
      render(React.createElement(PostTitle, null, 'Test Post'))
      
      expect(screen.getByTestId('chakra-box')).toBeInTheDocument()
      expect(screen.getByText('Publicaciones')).toBeInTheDocument()
      expect(screen.getByText('Test Post')).toBeInTheDocument()
      expect(screen.getByTestId('chevron-right-icon')).toBeInTheDocument()
    })

    it('renders link to posts page', () => {
      render(React.createElement(PostTitle, null, 'Test Post'))
      
      const link = screen.getByTestId('next-link')
      expect(link).toHaveAttribute('href', '/posts')
    })

    it('renders heading with correct tag', () => {
      render(React.createElement(PostTitle, null, 'Test Post'))
      
      const heading = screen.getByTestId('chakra-heading')
      expect(heading.tagName).toBe('H3')
    })
  })

  describe('PostImage', () => {
    const mockProps = {
      src: '/test-post.jpg',
      alt: 'Test post image'
    }

    it('renders post image with correct props', () => {
      render(React.createElement(PostImage, mockProps))
      
      const image = screen.getByTestId('chakra-image')
      expect(image).toHaveAttribute('src', '/test-post.jpg')
      expect(image).toHaveAttribute('alt', 'Test post image')
    })

    it('renders image element', () => {
      render(React.createElement(PostImage, mockProps))
      
      const image = screen.getByTestId('chakra-image')
      expect(image.tagName).toBe('IMG')
    })
  })

  describe('PostMeta', () => {
    it('renders post meta badge', () => {
      render(React.createElement(PostMeta, null, 'JavaScript'))
      
      expect(screen.getByTestId('chakra-badge')).toBeInTheDocument()
      expect(screen.getByText('JavaScript')).toBeInTheDocument()
    })

    it('renders as span element', () => {
      render(React.createElement(PostMeta, null, 'JavaScript'))
      
      const badge = screen.getByTestId('chakra-badge')
      expect(badge.tagName).toBe('SPAN')
    })
  })
})