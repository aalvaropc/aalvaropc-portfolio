import '@testing-library/jest-dom'

// --- jsdom environment shims -------------------------------------------------
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})

global.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}

// --- Next.js primitives ------------------------------------------------------
jest.mock('next/link', () => {
  const React = require('react')
  const MockLink = ({ href, children, ...props }) =>
    React.createElement('a', { href, ...props }, children)
  MockLink.displayName = 'MockNextLink'
  return MockLink
})

jest.mock('next/head', () => {
  const React = require('react')
  const MockHead = ({ children }) => React.createElement(React.Fragment, null, children)
  MockHead.displayName = 'MockNextHead'
  return { __esModule: true, default: MockHead }
})

jest.mock('next/image', () => {
  const React = require('react')
  const MockImage = ({
    src,
    alt,
    priority: _priority,
    placeholder: _placeholder,
    blurDataURL: _blur,
    quality: _quality,
    fill: _fill,
    loader: _loader,
    ...props
  }) => {
    const resolved =
      typeof src === 'object' && src !== null ? src.src || '' : src
    return React.createElement('img', { src: resolved, alt, ...props })
  }
  MockImage.displayName = 'MockNextImage'
  return MockImage
})

// --- framer-motion: render plain elements, strip animation props -------------
jest.mock('framer-motion', () => {
  const React = require('react')
  const strip = ({
    initial: _i,
    animate: _a,
    exit: _e,
    transition: _t,
    whileHover: _wh,
    whileTap: _wt,
    whileInView: _wiv,
    viewport: _vp,
    variants: _v,
    layout: _l,
    layoutId: _lid,
    ...rest
  }) => rest
  const make = tag => {
    const Comp = React.forwardRef(({ children, ...props }, ref) =>
      React.createElement(tag, { ref, ...strip(props) }, children)
    )
    Comp.displayName = `motion.${tag}`
    return Comp
  }
  const motion = {}
  ;[
    'div',
    'article',
    'section',
    'span',
    'p',
    'a',
    'ul',
    'li',
    'nav',
    'header',
    'footer',
    'main',
    'h1',
    'h2',
    'h3'
  ].forEach(t => {
    motion[t] = make(t)
  })
  motion.create = make
  return { motion, AnimatePresence: ({ children }) => children }
})

// --- next-themes -------------------------------------------------------------
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
    resolvedTheme: 'dark',
    setTheme: jest.fn(),
    themes: ['light', 'dark']
  }),
  ThemeProvider: ({ children }) => children
}))

// --- default i18n (individual test files may override) -----------------------
jest.mock('./lib/i18nContext', () => ({
  useI18n: () => ({
    t: (key, fallback) => fallback || key,
    locale: 'es',
    changeLocale: jest.fn(),
    supportedLocales: ['es', 'en'],
    isLoading: false,
    getWorks: () => ({ title: 'Proyectos', projects: [] }),
    getPosts: () => ({ title: 'Publicaciones', articles: [] })
  }),
  I18nProvider: ({ children }) => children
}))

// --- localStorage ------------------------------------------------------------
const store = {}
global.localStorage = {
  getItem: jest.fn(k => (k in store ? store[k] : null)),
  setItem: jest.fn((k, v) => {
    store[k] = String(v)
  }),
  removeItem: jest.fn(k => {
    delete store[k]
  }),
  clear: jest.fn(() => {
    Object.keys(store).forEach(k => delete store[k])
  })
}
