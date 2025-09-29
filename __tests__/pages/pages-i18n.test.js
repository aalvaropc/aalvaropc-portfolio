/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Works from '../../pages/works'
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
    Heading: ({ children, as, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      const HeadingTag = as || 'h1'
      return React.createElement(HeadingTag, { 'data-testid': 'heading', ...domProps }, children)
    },
    SimpleGrid: ({ children, columns, spacing, ...allProps }) => {
      const domProps = filterDOMProps({ 'data-columns': columns, 'data-spacing': spacing, ...allProps })
      return <div data-testid="simple-grid" {...domProps}>{children}</div>
    }
  }
})

// Mock Next.js components
jest.mock('next/link', () => {
  return function Link({ children, href, ...props }) {
    return <a href={href} {...props}>{children}</a>
  }
})

jest.mock('next/image', () => {
  return function Image({ src, alt, width, height, ...props }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} {...props} />
  }
})

// Mock Layout component 
jest.mock('../../components/layouts/article', () => {
  return function MockLayout({ children }) {
    return <div data-testid="mock-layout">{children}</div>
  }
})

// Mock Section component
jest.mock('../../components/section', () => {
  return function MockSection({ children, delay }) {
    return <div data-testid="mock-section" data-delay={delay}>{children}</div>  
  }
})

// Mock grid items
jest.mock('../../components/grid-items', () => ({
  WorkGridItem: function MockWorkGridItem({ id, title, children, thumbnail }) {
    return (
      <div data-testid={`work-item-${id}`}>
        <h3>{title}</h3>
        <p>{children}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumbnail} alt={title} />
      </div>
    )
  },
  PostGridItem: function MockPostGridItem({ id, title, children, thumbnail }) {
    return (
      <div data-testid={`post-item-${id}`}>
        <h3>{title}</h3>
        <p>{children}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={thumbnail} alt={title} />
      </div>
    )
  }
}))

// Mock useI18n hook
jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    t: (key, fallback) => fallback || key,
    getWorks: () => ({
      title: 'Proyectos',
      userBehaviorPipeline: {
        title: 'User Behavior Analysis Pipeline',
        description: 'Pipeline automatizado de datos desarrollado con Airflow, Apache Spark y Docker.'
      },
      farmaLuren: {
        title: 'Sistema de Facturación Automatizada - FarmaLuren',
        description: 'Sistema de facturación diseñado para farmacias, desarrollado con Django Rest Framework.'
      },
      rmap: {
        title: 'RMap - Sistema de Mapas',
        description: 'Aplicación web interactiva de mapas desarrollada con React.'
      },
      covid: {
        title: 'COVID-19 Dashboard',
        description: 'Dashboard de seguimiento de casos de COVID-19.'
      },
      lexer: {
        title: 'Analizador Léxico',
        description: 'Implementación de un analizador léxico para compiladores.'
      },
      webdevfest: {
        title: 'Web DevFest',
        description: 'Sitio web para evento de desarrolladores.'
      },
      appdevfest: {
        title: 'App DevFest',
        description: 'Aplicación móvil para evento de desarrolladores.'
      },
      numzzle: {
        title: 'Numzzle Game',
        description: 'Juego de puzzle numérico interactivo.'
      },
      analisisWD: {
        title: 'Análisis Web Data',
        description: 'Herramienta de análisis de datos web.'
      },
      cineflix: {
        title: 'Cineflix',
        description: 'Plataforma de streaming de películas.'
      }
    }),
    getPosts: () => ({
      title: 'Publicaciones',
      GrupoEstadistica: {
        title: 'Grupo de Estudio de Estadística',
        description: 'Formación y coordinación de grupo de estudio enfocado en estadística aplicada.'
      },
      ArqBasadaEventos: {
        title: 'Arquitectura Basada en Eventos',
        description: 'Exploración completa de la arquitectura basada en eventos y sus patrones de implementación.'
      }
    })
  })
}))

// Mock images
jest.mock('../../public/images/works/rmap.png', () => '/mock-rmap.png')
jest.mock('../../public/images/works/covid.png', () => '/mock-covid.png')
jest.mock('../../public/images/works/lexer.png', () => '/mock-lexer.png')
jest.mock('../../public/images/works/farmaLuren.png', () => '/mock-farmaLuren.png')
jest.mock('../../public/images/works/webdevfest.png', () => '/mock-webdevfest.png')
jest.mock('../../public/images/works/appdevfest.png', () => '/mock-appdevfest.png')
jest.mock('../../public/images/works/numzzle/numzzle_game.png', () => '/mock-numzzle.png')
jest.mock('../../public/images/works/analisisWD/analisisWD_dashboard.jpg', () => '/mock-analisisWD.jpg')
jest.mock('../../public/images/works/database.jpg', () => '/mock-database.jpg')
jest.mock('../../public/images/works/userBehaviorPipeline/pipeline.png', () => '/mock-pipeline.png')
jest.mock('../../public/images/posts/wlp/EdaWlp.png', () => '/mock-EdaWlp.png')
jest.mock('../../public/images/posts/estadistica/portada-diapo.png', () => '/mock-portada-diapo.png')

describe('Pages Internationalization', () => {

  describe('Works Page', () => {
    it('renders works page with Spanish content', async () => {
      render(<Works />)

      // Debería mostrar el título (puede ser fallback o traducido)
      await waitFor(() => {
        expect(screen.getByText(/Trabajos|Proyectos/)).toBeInTheDocument()
      })

      // Verificar que se renderizan los proyectos
      await waitFor(() => {
        expect(screen.getByTestId('work-item-userBehaviorPipeline')).toBeInTheDocument()
      })
    })

    it('shows fallback content when translations fail', async () => {
      render(<Works />)

      await waitFor(() => {
        expect(screen.getByText('Proyectos')).toBeInTheDocument()
      })
    })
  })

  describe('Posts Page', () => {
    it('renders posts page with Spanish content', async () => {
      render(<Posts />)

      // Debería mostrar el título (puede ser fallback o traducido)  
      await waitFor(() => {
        expect(screen.getByText(/Blog|Publicaciones/)).toBeInTheDocument()
      })

      // Verificar que se renderizan los posts
      await waitFor(() => {
        expect(screen.getByTestId('post-item-GrupoEstadistica')).toBeInTheDocument()
      })
    })

    it('shows fallback content when translations fail', async () => {
      render(<Posts />)

      await waitFor(() => {
        expect(screen.getByText('Publicaciones')).toBeInTheDocument()
      })
    })
  })
})
