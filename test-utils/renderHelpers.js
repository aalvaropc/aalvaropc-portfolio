import React from 'react'
import { render } from '@testing-library/react'

// Mock para react-icons
jest.mock('react-icons/fa', () => ({
  FaGithub: (props) => React.createElement('span', { ...props, 'data-testid': 'github-icon' }, 'GitHub'),
  FaLinkedin: (props) => React.createElement('span', { ...props, 'data-testid': 'linkedin-icon' }, 'LinkedIn'),
  FaTwitter: (props) => React.createElement('span', { ...props, 'data-testid': 'twitter-icon' }, 'Twitter'),
  FaEnvelope: (props) => React.createElement('span', { ...props, 'data-testid': 'email-icon' }, 'Email')
}))

jest.mock('react-icons/io5', () => ({
  IoLogoLinkedin: (props) => React.createElement('span', { ...props, 'data-testid': 'linkedin-icon-io5' }, 'LinkedIn'),
  IoLogoGithub: (props) => React.createElement('span', { ...props, 'data-testid': 'github-icon-io5' }, 'GitHub')
}))

jest.mock('react-icons/md', () => ({
  MdEmail: (props) => React.createElement('span', { ...props, 'data-testid': 'email-icon-md' }, 'Email')
}))

// Mock Next.js Link
jest.mock('next/link', () => {
  return function MockNextLink({ children, href, ...props }) {
    return React.createElement('a', { href, ...props }, children)
  }
})

// Mock ChakraUI icons
jest.mock('@chakra-ui/icons', () => ({
  ChevronRightIcon: (props) => React.createElement('span', { ...props, 'data-testid': 'chevron-right' }, '>')
}))

// Mock layouts
jest.mock('../components/layouts/main.jsx', () => {
  return function MockMainLayout({ children }) {
    return React.createElement('div', { 'data-testid': 'main-layout' }, children)
  }
})

jest.mock('../components/layouts/article.js', () => {
  return function MockArticleLayout({ children }) {
    return React.createElement('div', { 'data-testid': 'article-layout' }, children)
  }
})

// Mock components adicionales necesarios
jest.mock('../components/paragraph.js', () => {
  return function MockParagraph({ children }) {
    return React.createElement('p', null, children)
  }
})

jest.mock('../components/bio.js', () => ({
  BioSection: ({ children }) => React.createElement('div', { 'data-testid': 'bio-section' }, children),
  BioYear: ({ children }) => React.createElement('span', { 'data-testid': 'bio-year' }, children)
}))

jest.mock('../components/section.js', () => {
  return function MockSection({ children, delay }) {
    return React.createElement('section', { 'data-testid': 'section', 'data-delay': delay }, children)
  }
})

// Mock components específicos del proyecto
jest.mock('../components/logo.jsx', () => {
  return function Logo() {
    return React.createElement('div', null, 'Alvaro Peña')
  }
})

jest.mock('../components/theme-toggle-button.jsx', () => {
  return function ThemeToggleButton() {
    return React.createElement('button', { 'aria-label': 'toggle theme' }, '🌙')
  }
})

jest.mock('../components/LanguageSelector.js', () => {
  return function LanguageSelector() {
    return React.createElement('select', { 'aria-label': 'language selector' }, 
      React.createElement('option', { value: 'es' }, 'ES'),
      React.createElement('option', { value: 'en' }, 'EN')
    )
  }
})

// Mock para useLocaleDetection
jest.mock('../lib/useLocaleDetection', () => ({
  __esModule: true,
  default: () => ({
    locale: 'es',
    isLoading: false,
    changeLocale: jest.fn(),
    supportedLocales: ['es', 'en']
  })
}))

// Mock para useTranslations
jest.mock('../lib/useTranslations.js', () => ({
  __esModule: true,
  default: (locale, namespace) => {
    const mockTranslations = {
      common: {
        hero: {
          title: 'Hola, soy Alvaro Peña',
          subtitle: 'Desarrollador Full Stack'
        },
        nav: {
          home: 'Inicio',
          works: 'Trabajos',
          posts: 'Posts',
          about: 'Sobre mí'
        },
        about: {
          title: 'Sobre mí',
          description: 'Soy un desarrollador apasionado...'
        },
        experience: {
          title: 'Experiencia'
        },
        skills: {
          title: 'Habilidades'
        },
        contact: {
          title: 'Contacto'
        }
      },
      works: {
        works: {
          title: 'Trabajos',
          userBehaviorPipeline: {
            title: 'User Behavior Pipeline',
            description: 'Pipeline de datos para análisis de comportamiento de usuario'
          },
          farmaLuren: {
            title: 'FarmaLuren',
            description: 'Sistema de gestión farmacéutica'
          },
          rmap: {
            title: 'RMap',
            description: 'Aplicación de mapas interactivos'
          }
        }
      },
      posts: {
        posts: {
          title: 'Posts',
          grupoEstadistica: {
            title: 'Grupo de Estudio de Estadística',
            description: 'Formación de grupo de estudio'
          },
          arquitecturaEventos: {
            title: 'Arquitectura Basada en Eventos',
            description: 'Conceptos de arquitectura de software'
          }
        }
      }
    }

    return {
      translations: mockTranslations[namespace] || {},
      isLoading: false,
      error: null,
      t: (key) => {
        const keys = key.split('.')
        let value = mockTranslations[namespace]
        for (const k of keys) {
          value = value?.[k]
        }
        return value || key
      },
      tInterpolate: (key, variables) => {
        const keys = key.split('.')
        let value = mockTranslations[namespace]
        for (const k of keys) {
          value = value?.[k]
        }
        if (!value) return key
        
        return Object.keys(variables || {}).reduce((str, varKey) => {
          return str.replace(`{{${varKey}}}`, variables[varKey])
        }, value)
      }
    }
  }
}))

// Mock de useI18n hook
jest.mock('../lib/i18nContext', () => ({
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

// Provider combinado para tests
export const TestProviders = ({ children }) => {
  return (
    <>
      {children}
    </>
  )
}

// Función helper para renderizar con todos los providers
export const renderWithProviders = (component) => {
  return render(
    <TestProviders>
      {component}
    </TestProviders>
  )
}

// Re-exportar todo lo de testing-library
export * from '@testing-library/react'