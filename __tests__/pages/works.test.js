import { render, screen } from '@testing-library/react'
import Works from '../../pages/works'

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
    Heading: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <h1 data-testid="heading" {...domProps}>{children}</h1>
    },
    SimpleGrid: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div data-testid="simple-grid" {...domProps}>{children}</div>
    },
  }
})

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  }
})

// Mock next/link 
jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }) {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock @emotion/react
jest.mock('@emotion/react', () => ({
  Global: ({ styles: _styles }) => null
}))

// Mock Section component
jest.mock('../../components/section', () => {
  return function MockSection({ children, delay: _delay }) {
    return <div data-testid="section">{children}</div>
  }
})

// Mock grid-items components
jest.mock('../../components/grid-items', () => ({
  WorkGridItem: ({ children, title, thumbnail }) => (
    <div data-testid="work-grid-item">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  )
}))

// Mock Layout component
jest.mock('../../components/layouts/article', () => {
  return function MockLayout({ children }) {
    return <main data-testid="layout">{children}</main>
  }
})

// Mock useI18n hook
jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    getWorks: () => ({
      title: 'Trabajos',
      projects: [
        {
          id: 'userBehaviorPipeline',
          title: 'User Behavior Pipeline',
          description: 'Pipeline para análisis de comportamiento de usuarios'
        },
        {
          id: 'farmaLuren',
          title: 'FarmaLuren',
          description: 'Sistema de facturación automatizado'
        },
        {
          id: 'rmap',
          title: 'Rmap',
          description: 'App de reciclaje con gamificación'
        }
      ]
    })
  })
}))

// Mock image imports
jest.mock('../../public/images/works/rmap.png', () => 'rmap.png')
jest.mock('../../public/images/works/covid.png', () => 'covid.png')
jest.mock('../../public/images/works/lexer.png', () => 'lexer.png')
jest.mock('../../public/images/works/farmaLuren.png', () => 'farmaLuren.png')
jest.mock('../../public/images/works/webdevfest.png', () => 'webdevfest.png')
jest.mock('../../public/images/works/appdevfest.png', () => 'appdevfest.png')
jest.mock('../../public/images/works/numzzle/numzzle_game.png', () => 'numzzle_game.png')
jest.mock('../../public/images/works/analisisWD/analisisWD_dashboard.jpg', () => 'analisisWD_dashboard.jpg')
jest.mock('../../public/images/works/database.jpg', () => 'database.jpg')
jest.mock('../../public/images/works/userBehaviorPipeline/pipeline.png', () => 'pipeline.png')

describe('Works Page', () => {
  it('renders page heading', () => {
    render(<Works />)
    
    const heading = screen.getByRole('heading', { name: /trabajos/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays project grid items', () => {
    render(<Works />)
    
    // Check for some expected project names based on your actual projects
    expect(screen.getByText(/user behavior pipeline/i)).toBeInTheDocument()
    expect(screen.getByText(/farmaluren/i)).toBeInTheDocument()
    expect(screen.getByText(/rmap/i)).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    render(<Works />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('contains project grid', () => {
    render(<Works />)
    
    const grid = screen.getByTestId('simple-grid')
    expect(grid).toBeInTheDocument()
    
    const gridItems = screen.getAllByTestId('work-grid-item')
    expect(gridItems.length).toBeGreaterThan(0)
  })
})