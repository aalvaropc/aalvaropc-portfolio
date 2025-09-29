/**
 * @jest-environment jsdom
 */

import { render, screen, waitFor } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { I18nProvider } from '../../lib/i18nContext'
import Works from '../../pages/works'
import Posts from '../../pages/posts'
import theme from '../../lib/theme'

// Mock fetch for translations
global.fetch = jest.fn()

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

const mockTranslations = {
  es: {
    works: {
      title: 'Trabajos',
      projects: [
        {
          id: 'userBehaviorPipeline',
          title: 'Pipeline de Análisis de Comportamiento de Usuarios',
          description: 'Pipeline automatizado de datos desarrollado con Airflow, Apache Spark y Docker.'
        },
        {
          id: 'farmaLuren',
          title: 'Sistema de Facturación Automatizada - FarmaLuren',
          description: 'Sistema de facturación diseñado para farmacias, desarrollado con Django Rest Framework.'
        }
      ]
    },
    posts: {
      title: 'Blog',
      articles: [
        {
          id: 'ArqBasadaEventos',
          title: 'Arquitectura Basada en Eventos',
          description: 'Exploración completa de la arquitectura basada en eventos.'
        }
      ]
    }
  },
  en: {
    works: {
      title: 'Works',
      projects: [
        {
          id: 'userBehaviorPipeline',
          title: 'User Behavior Analysis Pipeline',
          description: 'Automated data pipeline developed with Airflow, Apache Spark and Docker.'
        },
        {
          id: 'farmaLuren',
          title: 'Automated Billing System - FarmaLuren',
          description: 'Billing system designed for pharmacies, developed with Django Rest Framework.'
        }
      ]
    },
    posts: {
      title: 'Blog',
      articles: [
        {
          id: 'ArqBasadaEventos',
          title: 'Event-Driven Architecture',
          description: 'Complete exploration of event-driven architecture.'
        }
      ]
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

describe('Pages Internationalization', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear()
    
    // Mock successful fetch responses
    fetch.mockImplementation((url) => {
      const lang = url.includes('/es/') ? 'es' : 'en'
      let namespace = 'common'
      
      if (url.includes('works.json')) namespace = 'works'
      if (url.includes('posts.json')) namespace = 'posts'
      
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockTranslations[lang][namespace] || {})
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Works Page', () => {
    it('renders works page with Spanish content', async () => {
      render(
        <TestWrapper>
          <Works />
        </TestWrapper>
      )

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
      // Mock fetch to fail
      fetch.mockRejectedValue(new Error('Network error'))

      render(
        <TestWrapper>
          <Works />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Proyectos')).toBeInTheDocument()
      })
    })
  })

  describe('Posts Page', () => {
    it('renders posts page with Spanish content', async () => {
      render(
        <TestWrapper>
          <Posts />
        </TestWrapper>
      )

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
      // Mock fetch to fail
      fetch.mockRejectedValue(new Error('Network error'))

      render(
        <TestWrapper>
          <Posts />
        </TestWrapper>
      )

      await waitFor(() => {
        expect(screen.getByText('Publicaciones')).toBeInTheDocument()
      })
    })
  })
})