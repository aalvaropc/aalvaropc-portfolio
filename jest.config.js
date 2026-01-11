const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './'
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'components/**/*.{js,jsx}',
    'pages/**/*.{js,jsx}',
    'lib/**/*.{js,jsx}',
    '!pages/_app.js',
    '!pages/_document.js',
    '!pages/404.js',
    '!pages/works/**',
    '!pages/posts/**',
    '!components/fractal-tree*.js',
    '!components/pure-fractal-tree.js',
    '!components/LoadingScreen.js',
    '!lib/useLocaleDetection.js',
    '!lib/useTranslations.js',
    '!lib/usePostDetail.js',
    '!lib/useWorkDetail.js',
    '!lib/i18nContext.js',
    '!**/*.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 15,
      lines: 15,
      statements: 15
    }
  },
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@chakra-ui|@emotion|framer-motion)/)'
  ]
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
