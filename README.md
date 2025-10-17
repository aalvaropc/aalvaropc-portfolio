# Alvaro Peña - Portfolio

[![CI Pipeline](https://github.com/aalvaropc/aalvaropc-portfolio/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/aalvaropc/aalvaropc-portfolio/actions)
[![Coverage](https://img.shields.io/badge/coverage-87.7%25-brightgreen)](https://github.com/aalvaropc/aalvaropc-portfolio)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)

Personal portfolio website built with modern web technologies.

## Features

- **Internationalization**: Spanish/English with automatic locale detection
- **Responsive Design**: Mobile-first approach with dark/light themes
- **Testing**: 115 tests with 87.7% coverage
- **CI/CD**: Automated pipeline with GitHub Actions

## Tech Stack

- Next.js 15 + React 19
- Chakra UI + Framer Motion
- Jest + React Testing Library
- ESLint + Prettier + Husky

## Development

### Prerequisites

- Node.js 22+
- pnpm 8+

### Setup

```bash
git clone https://github.com/aalvaropc/aalvaropc-portfolio.git
cd aalvaropc-portfolio
pnpm install
pnpm dev
```

### Scripts

```bash
pnpm dev        # Development server
pnpm build      # Production build
pnpm test       # Run tests
pnpm lint       # Code linting
```

## Project Structure

```
├── components/      # React components
├── pages/          # Next.js pages
├── lib/            # Utilities and hooks
├── public/         # Static assets
│   └── locales/    # Translation files
└── __tests__/      # Test suites
```

## License

MIT
