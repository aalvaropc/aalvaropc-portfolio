// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import React from 'react'

// Suppress React act() warnings in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is deprecated')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

// Mock ChakraUI components with proper prop filtering
const createChakraMock = (componentName, allowedProps = []) => {
  const Component = React.forwardRef(({ children, ...props }, ref) => {
    // Filter out Chakra-specific props to avoid DOM warnings
    const filteredProps = {}
    const standardProps = [
      'id',
      'className',
      'style',
      'onClick',
      'onSubmit',
      'onChange',
      'data-testid',
      'aria-label',
      'role',
      'href',
      'target',
      'type',
      'placeholder',
      'value',
      'name',
      'disabled',
      'required',
      'maxLength',
      'rows',
      'resize',
      ...allowedProps
    ]

    Object.keys(props).forEach(prop => {
      if (
        standardProps.includes(prop) ||
        prop.startsWith('data-') ||
        prop.startsWith('aria-')
      ) {
        filteredProps[prop] = props[prop]
      }
    })

    // Add data-testid for specific components
    if (componentName.toLowerCase() === 'heading') {
      filteredProps['data-testid'] = 'heading'
    }
    if (componentName.toLowerCase() === 'list') {
      filteredProps['data-testid'] = 'list'
    }

    // Special handling for buttons inside elements with href - make them links
    const hasHrefParent = props.href
    const shouldBeLink =
      (componentName.toLowerCase() === 'button' && hasHrefParent) ||
      (componentName.toLowerCase() === 'div' && hasHrefParent)

    return React.createElement(
      componentName.toLowerCase() === 'input'
        ? 'input'
        : componentName.toLowerCase() === 'textarea'
          ? 'textarea'
          : componentName.toLowerCase() === 'heading'
            ? 'h2'
            : shouldBeLink
              ? 'a'
              : componentName.toLowerCase() === 'button'
                ? 'button'
                : 'div',
      { ref, ...filteredProps },
      children
    )
  })

  Component.displayName = `Mock${componentName}`
  return Component
}

// Mock @chakra-ui/react
jest.mock('@chakra-ui/react', () => ({
  Box: createChakraMock('Box'),
  Flex: createChakraMock('Flex'),
  Stack: createChakraMock('Stack'),
  VStack: createChakraMock('VStack'),
  HStack: createChakraMock('HStack'),
  Text: createChakraMock('Text'),
  Heading: createChakraMock('Heading'),
  Button: createChakraMock('Button'),
  Input: createChakraMock('Input'),
  Textarea: createChakraMock('Textarea'),
  FormControl: createChakraMock('FormControl'),
  FormLabel: createChakraMock('FormLabel'),
  Alert: createChakraMock('Alert'),
  AlertIcon: () => React.createElement('span', { 'data-testid': 'alert-icon' }),
  Link: createChakraMock('Link'),
  Image: createChakraMock('Image'),
  Container: createChakraMock('Container'),
  Grid: createChakraMock('Grid'),
  GridItem: createChakraMock('GridItem'),
  SimpleGrid: createChakraMock('SimpleGrid'),
  List: createChakraMock('List'),
  ListItem: createChakraMock('ListItem'),
  Badge: createChakraMock('Badge'),
  Card: createChakraMock('Card'),
  CardBody: createChakraMock('CardBody'),
  CardHeader: createChakraMock('CardHeader'),
  Divider: createChakraMock('Divider'),
  useColorModeValue: jest.fn(light => light),
  useColorMode: jest.fn(() => ({
    colorMode: 'light',
    toggleColorMode: jest.fn()
  })),
  ChakraProvider: ({ children }) => children,
  extendTheme: jest.fn(() => ({})),
  chakra: Component => {
    const ChakraComponent = React.forwardRef((props, ref) => {
      // Remove Chakra-specific props that shouldn't be passed to DOM
      const { shouldForwardProp: _shouldForwardProp, ...filteredProps } = props
      const allowedProps = [
        'id',
        'className',
        'style',
        'onClick',
        'onSubmit',
        'onChange',
        'data-testid',
        'aria-label',
        'role',
        'href',
        'target',
        'type'
      ]

      const domProps = {}
      Object.keys(filteredProps).forEach(prop => {
        if (
          allowedProps.includes(prop) ||
          prop.startsWith('data-') ||
          prop.startsWith('aria-')
        ) {
          domProps[prop] = filteredProps[prop]
        }
      })

      return React.createElement(
        Component,
        { ref, ...domProps },
        props.children
      )
    })

    ChakraComponent.displayName = `Chakra(${typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Component'})`
    return ChakraComponent
  },
  shouldForwardProp: _prop => true
}))

// Mock @chakra-ui/icons
jest.mock('@chakra-ui/icons', () => ({
  ChevronRightIcon: () =>
    React.createElement('span', { 'data-testid': 'chevron-right' }, '→')
}))

// Mock framer-motion
jest.mock('framer-motion', () => {
  const motion = Component => {
    // Return a component that behaves like the original but without animations
    const MotionComponent = React.forwardRef(
      ({ children, ...otherProps }, ref) => {
        // Remove framer-motion specific props
        const {
          animate: _animate,
          initial: _initial,
          exit: _exit,
          transition: _transition,
          whileHover: _whileHover,
          whileTap: _whileTap,
          variants: _variants,
          layoutId: _layoutId,
          layout: _layout,
          ...props
        } = otherProps

        if (typeof Component === 'string') {
          return React.createElement(Component, { ref, ...props }, children)
        }

        return React.createElement(Component, { ref, ...props }, children)
      }
    )

    MotionComponent.displayName = `Motion(${typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Component'})`
    return MotionComponent
  }

  // Create motion components for common HTML elements
  const elements = [
    'div',
    'section',
    'article',
    'nav',
    'header',
    'footer',
    'main',
    'aside',
    'span',
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6'
  ]

  elements.forEach(element => {
    motion[element] = motion(element)
  })

  return {
    motion,
    AnimatePresence: ({ children }) => children
  }
})

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }) {
    return React.createElement('a', { href, ...props }, children)
  }
})

jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }) {
    return React.createElement('img', { src, alt, ...props })
  }
})

// Mock react-icons
jest.mock('react-icons/io5', () => ({
  IoLogoLinkedin: () =>
    React.createElement('span', { 'data-testid': 'linkedin-icon' }, 'LinkedIn'),
  IoLogoGithub: () =>
    React.createElement('span', { 'data-testid': 'github-icon' }, 'GitHub'),
  IoMail: () =>
    React.createElement('span', { 'data-testid': 'email-icon' }, 'Email')
}))

jest.mock('react-icons/md', () => ({
  MdKeyboardArrowRight: () =>
    React.createElement('span', { 'data-testid': 'arrow-right' }, '→'),
  MdEmail: () =>
    React.createElement('span', { 'data-testid': 'email-icon-md' }, 'Email')
}))

jest.mock('react-icons/fi', () => ({
  FiBriefcase: () =>
    React.createElement(
      'span',
      { 'data-testid': 'briefcase-icon' },
      'Briefcase'
    ),
  FiCalendar: () =>
    React.createElement('span', { 'data-testid': 'calendar-icon' }, 'Calendar')
}))

// Mock components that use complex Chakra + Framer Motion combinations
jest.mock('./components/section.js', () => {
  return function MockSection({ children, delay }) {
    return React.createElement(
      'section',
      { 'data-testid': 'section', 'data-delay': delay },
      children
    )
  }
})

// Solo mockear componentes que no existen o que necesitan mocking específico

// Mock i18nContext
jest.mock('./lib/i18nContext', () => ({
  useI18n: () => ({
    t: (key, fallback) => fallback || key,
    getHome: () => ({
      hero: {
        greeting: 'Hola, soy Alvaro Peña!',
        title: 'Backend-focused Full Stack Developer',
        description: 'Apasionado por Go, Python y Java'
      },
      about: {
        title: 'Sobre Mí',
        content:
          'Desarrollador con experiencia en Go, Python y Java. Me especializo en backend con FastAPI, Spring Boot y desarrollo de APIs robustas.'
      },
      experience: {
        title: 'Experiencia',
        jobs: [
          {
            position: 'Backend Developer',
            company: 'Guinea Mobile',
            period: '2025 febrero - 2025 septiembre',
            location: 'Lima, Perú'
          },
          {
            position: 'Software Engineer',
            company: 'NTT Data',
            period: '2024 febrero - 2025 febrero',
            location: 'Lima, Perú'
          },
          {
            position: 'Freelance Developer',
            company: 'Proveedy',
            period: '2023 octubre - 2024 enero',
            location: 'Ica, Perú'
          }
        ]
      },
      stack: {
        title: 'Stack',
        technologies: 'Go • Python • Java • FastAPI • Spring Boot'
      },
      contact: {
        title: 'Contacto',
        links: [
          {
            type: 'github',
            url: 'https://github.com/aalvaropc',
            label: 'GitHub'
          },
          {
            type: 'linkedin',
            url: 'https://www.linkedin.com/in/aalvarop-pe/',
            label: 'LinkedIn'
          },
          { type: 'email', url: 'mailto:aalvaropc@gmail.com', label: 'Email' }
        ]
      },
      projects: {
        cta: 'Ver Proyectos'
      },
      interests: {
        title: 'Intereses',
        items: [
          'Arquitecturas escalables',
          'Sistemas distribuidos',
          'Google Developer Group Ica'
        ]
      }
    })
  })
}))

// Mock Firebase
jest.mock('./lib/firebase', () => ({
  db: {},
  collection: jest.fn(),
  addDoc: jest.fn()
}))

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn()
}))

// Mock geolocation for i18n tests
Object.defineProperty(global.navigator, 'geolocation', {
  value: {
    getCurrentPosition: jest.fn().mockImplementation(success => {
      success({
        coords: {
          latitude: -14.0723,
          longitude: -75.7289
        }
      })
    })
  },
  writable: true
})

// Mock localStorage for i18n tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock
