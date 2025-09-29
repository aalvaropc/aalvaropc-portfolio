import { render, screen } from '@testing-library/react'
import React from 'react'

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

// Mock next/head
jest.mock('next/head', () => {
  const React = require('react')
  
  const MockHead = ({ children }) => React.createElement('div', { 'data-testid': 'next-head' }, children)
  MockHead.displayName = 'MockHead'
  
  return MockHead
})

// Mock next/dynamic
jest.mock('next/dynamic', () => {
  const React = require('react')
  
  return jest.fn(() => {
    const MockDynamicComponent = () => React.createElement('div', { 'data-testid': 'dynamic-component' })
    MockDynamicComponent.displayName = 'MockDynamicComponent'
    return MockDynamicComponent
  })
})

// Mock framer-motion
jest.mock('framer-motion', () => {
  const React = require('react')
  
  const MockMotion = {
    article: React.forwardRef((props, ref) => {
      const InnerMockMotionArticle = ({ children, ...rest }) => {
        const domProps = filterDOMProps(rest)
        return React.createElement('article', { 
          ...domProps, 
          'data-testid': 'motion-article',
          ref 
        }, children)
      }
      InnerMockMotionArticle.displayName = 'MotionArticle'
      return React.createElement(InnerMockMotionArticle, props)
    })
  }
  MockMotion.article.displayName = 'MockMotionArticle'

  return {
    motion: MockMotion
  }
})

// Mock Chakra UI components
jest.mock('@chakra-ui/react', () => {
  const React = require('react')
  
  const MockBox = React.forwardRef((props, ref) => {
    const InnerMockBox = ({ children, as = 'div', ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement(as, { 
        ...domProps, 
        'data-testid': 'chakra-box',
        ref 
      }, children)
    }
    InnerMockBox.displayName = 'Box'
    return React.createElement(InnerMockBox, props)
  })
  MockBox.displayName = 'MockBox'

  const MockContainer = React.forwardRef((props, ref) => {
    const InnerMockContainer = ({ children, ...rest }) => {
      const domProps = filterDOMProps(rest)
      return React.createElement('div', { 
        ...domProps, 
        'data-testid': 'chakra-container',
        ref 
      }, children)
    }
    InnerMockContainer.displayName = 'Container'
    return React.createElement(InnerMockContainer, props)
  })
  MockContainer.displayName = 'MockContainer'

  return {
    Box: MockBox,
    Container: MockContainer
  }
})

// Mock grid-items
jest.mock('../../components/grid-items', () => {
  const React = require('react')
  
  const MockGridItemStyle = () => React.createElement('style', { 'data-testid': 'grid-item-style' })
  MockGridItemStyle.displayName = 'MockGridItemStyle'
  
  return {
    GridItemStyle: MockGridItemStyle
  }
})

// Mock components
jest.mock('../../components/navbar.jsx', () => {
  const React = require('react')
  
  const MockNavbar = ({ children }) => React.createElement('nav', { 'data-testid': 'navbar' }, children)
  MockNavbar.displayName = 'MockNavbar'
  
  return MockNavbar
})

jest.mock('../../components/Footer', () => {
  const React = require('react')
  
  const MockFooter = () => React.createElement('footer', { 'data-testid': 'footer' })
  MockFooter.displayName = 'MockFooter'
  
  return MockFooter
})

jest.mock('../../components/fractal-tree-loader.js', () => {
  const React = require('react')
  
  const MockFractalTreeLoader = () => React.createElement('div', { 'data-testid': 'fractal-tree-loader' })
  MockFractalTreeLoader.displayName = 'MockFractalTreeLoader'
  
  return MockFractalTreeLoader
})

jest.mock('../../components/LoadingScreen', () => {
  const React = require('react')
  
  const MockLoadingScreen = ({ message }) => React.createElement('div', { 'data-testid': 'loading-screen' }, message)
  MockLoadingScreen.displayName = 'MockLoadingScreen'
  
  return MockLoadingScreen
})

// Mock i18n context
jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    isLoading: false
  })
}))

// Import components after mocks
import ArticleLayout from '../../components/layouts/article.js'
import MainLayout from '../../components/layouts/main.jsx'

describe('Article Layout', () => {
  it('renders article layout with children', () => {
    render(React.createElement(ArticleLayout, null, 'Article content'))
    
    expect(screen.getByTestId('motion-article')).toBeInTheDocument()
    expect(screen.getByText('Article content')).toBeInTheDocument()
  })

  it('renders without title', () => {
    render(React.createElement(ArticleLayout, null, 'Content'))
    
    expect(screen.getByTestId('motion-article')).toBeInTheDocument()
    expect(screen.queryByTestId('next-head')).not.toBeInTheDocument()
  })

  it('renders with title and head tags', () => {
    render(React.createElement(ArticleLayout, { title: 'Test Article' }, 'Content'))
    
    expect(screen.getByTestId('motion-article')).toBeInTheDocument()
    expect(screen.getByTestId('next-head')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('includes grid item styles', () => {
    render(React.createElement(ArticleLayout, null, 'Content'))
    
    expect(screen.getByTestId('grid-item-style')).toBeInTheDocument()
  })

  it('renders as article element', () => {
    render(React.createElement(ArticleLayout, null, 'Content'))
    
    const article = screen.getByTestId('motion-article')
    expect(article.tagName).toBe('ARTICLE')
  })
})

describe('Main Layout', () => {
  const mockRouter = {
    asPath: '/test-path'
  }

  it('renders main layout with children', () => {
    render(React.createElement(MainLayout, { router: mockRouter }, 'Main content'))
    
    expect(screen.getByTestId('chakra-box')).toBeInTheDocument()
    expect(screen.getByText('Main content')).toBeInTheDocument()
  })

  it('includes navbar', () => {
    render(React.createElement(MainLayout, { router: mockRouter }, 'Content'))
    
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  it('includes container', () => {
    render(React.createElement(MainLayout, { router: mockRouter }, 'Content'))
    
    expect(screen.getByTestId('chakra-container')).toBeInTheDocument()
  })

  it('includes footer', () => {
    render(React.createElement(MainLayout, { router: mockRouter }, 'Content'))
    
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })

  it('includes dynamic fractal tree component', () => {
    render(React.createElement(MainLayout, { router: mockRouter }, 'Content'))
    
    expect(screen.getByTestId('dynamic-component')).toBeInTheDocument()
  })

  it('renders as main element', () => {
    render(React.createElement(MainLayout, { router: mockRouter }, 'Content'))
    
    const main = screen.getByTestId('chakra-box')
    expect(main.tagName).toBe('MAIN')
  })

  it('includes head with meta tags', () => {
    render(React.createElement(MainLayout, { router: mockRouter }, 'Content'))
    
    expect(screen.getByTestId('next-head')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})