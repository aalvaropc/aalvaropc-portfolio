import { render, screen } from '@testing-library/react'
import Posts from '../../pages/posts'

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

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ src, alt, ...props }) => <img src={src} alt={alt} data-testid="next-image" {...props} />,
}))

// Mock layout components  
jest.mock('../../components/layouts/article', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <main data-testid="article-layout" {...props}>{children}</main>,
}))

// Mock section component
jest.mock('../../components/section', () => ({
  __esModule: true,
  default: ({ children, ...props }) => <section data-testid="section" {...props}>{children}</section>,
}))

// Mock grid-items component
jest.mock('../../components/grid-items', () => ({
  PostGridItem: ({ id, title, thumbnail, children, ...props }) => (
    <article data-testid="post-item" {...props}>
      <a href={`/posts/${id}`} data-testid="post-link">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumbnail} alt={title} data-testid="post-thumbnail" />
        <h3 data-testid="post-title">{title}</h3>
        <div data-testid="post-description">{children}</div>
      </a>
    </article>
  ),
}))

// Mock i18n hook
jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    t: (key) => {
      const translations = {
        'posts.title': 'Publicaciones',
        'posts.subtitle': 'Blog posts y artículos',
      }
      return translations[key] || key
    },
    getPosts: () => ({
      title: 'Publicaciones',
      articles: [
        {
          id: 'GrupoEstadistica', 
          title: 'Grupo Estudio: Estadística práctica para ciencia de datos con R y Python',
          description: 'Participación en el grupo de estudio',
          thumbnail: '/images/posts/estadistica/portada-diapo.png'
        },
        {
          id: 'ArqBasadaEventos',
          title: 'Arquitectura Basada en Eventos con AWS', 
          description: 'Charla brindada para el Weekend Learning Path',
          thumbnail: '/images/posts/wlp/EdaWlp.png'
        }
      ]
    })
  })
}))

// Mock image imports
jest.mock('../../public/images/posts/wlp/EdaWlp.png', () => '/images/posts/wlp/EdaWlp.png')
jest.mock('../../public/images/posts/estadistica/portada-diapo.png', () => '/images/posts/estadistica/portada-diapo.png')

describe('Posts Page', () => {
  it('renders page heading', () => {
    render(<Posts />)
    
    const heading = screen.getByRole('heading', { name: /publicaciones/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays blog posts', () => {
    render(<Posts />)
    
    // Check for expected post titles based on mocked posts data
    expect(screen.getByText(/Grupo Estudio: Estadística práctica para ciencia de datos con R y Python/i)).toBeInTheDocument()
    expect(screen.getByText(/Arquitectura Basada en Eventos con AWS/i)).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    render(<Posts />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('contains post links', () => {
    render(<Posts />)
    
    const postLinks = screen.getAllByTestId('post-link')
    expect(postLinks.length).toBeGreaterThan(0)
  })
})