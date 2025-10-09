# Portfolio - Alvaro Peña

[![CI Pipeline](https://github.com/aalvaropc/aalvaropc-portfolio/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/aalvaropc/aalvaropc-portfolio/actions)
[![Test Coverage](https://img.shields.io/badge/coverage-88.4%25-brightgreen)](https://github.com/aalvaropc/aalvaropc-portfolio)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN-success)](https://github.com/aalvaropc/aalvaropc-portfolio)

> Portafolio personal de Alvaro Peña - Backend Developer especializado en Go, Python y arquitecturas escalables. Con sistema completo de internacionalización y diseño minimalista.

## 🌟 Características Destacadas

### 🌐 Internacionalización (i18n) ✨

- **Sistema completo**: Todas las páginas y contenido traducido
- **Detección automática**: Basada en geolocalización y preferencias del navegador
- **Idiomas soportados**: Español y Inglés (100% traducido)
- **Selector móvil mejorado**: Diseño tipo "pill toggle" moderno y compacto
- **UI consistente**: Botones de navegación uniformes (hamburguesa/tema)
- **Contenido dinámico**: JSON estructurado para proyectos y posts
- **Hooks personalizados**: useI18n, useTranslations, usePostDetail, useWorkDetail

### 🛡️ Seguridad y Rendimiento

- **Headers de seguridad**: CSP, HSTS, CORS
- **Optimización**: Lazy loading, compresión de imágenes
- **SEO**: Meta tags dinámicos, sitemap, robots.txt
- **Accesibilidad**: ARIA labels, navegación por teclado

### 🧪 Testing Robusto

- **Cobertura elevada**: 88.4% statements, 68.7% branches, 75% functions
- **114 tests**: Suite completa con React Testing Library y Jest
- **CI/CD automatizado**: Pipeline con GitHub Actions
- **Tests críticos**: Componentes, layouts, hooks y configuraciones
- **Mocks optimizados**: ChakraUI, Next.js, Framer Motion sin warnings

### 🎨 Interfaz y Experiencia

- **Diseño responsivo**: Optimizado para móviles y desktop
- **Modo oscuro**: Tema dinámico con persistencia
- **Animaciones**: Framer Motion para transiciones suaves
- **Árbol fractal**: Visualización interactiva con p5.js

## 🚀 Stack Tecnológico

- **Frontend**: Next.js 15.5.4, React 19.1.1, Chakra UI
- **Internacionalización**: Sistema i18n personalizado con hooks
- **Animaciones**: Framer Motion, p5.js (árbol fractal interactivo)
- **3D**: Three.js para visualizaciones
- **Testing**: Jest, React Testing Library (88.4% cobertura)
- **Desarrollo**: ESLint 9, Prettier, Turbopack, pnpm
- **CI/CD**: GitHub Actions con pipeline completo
- **Despliegue**: Vercel con optimizaciones automáticas

## 📁 Estructura del Proyecto

```
├── components/           # Componentes React reutilizables
│   ├── layouts/         # Layouts principales (main.jsx, article.js)
│   ├── LanguageSelector.js  # Selector de idioma minimalista
│   └── ...
├── pages/               # Páginas de Next.js con i18n completo
│   ├── works/           # Páginas individuales de proyectos
│   ├── posts/           # Páginas individuales de publicaciones
│   └── ...
├── lib/                 # Utilidades y hooks personalizados
│   ├── i18nContext.js   # Contexto de internacionalización
│   ├── useTranslations.js  # Hook para traducciones
│   ├── useWorkDetail.js # Hook para contenido de proyectos
│   ├── usePostDetail.js # Hook para contenido de posts
│   └── ...
├── public/              # Archivos estáticos
│   ├── locales/         # Sistema completo de traducciones
│   │   ├── es/          # Español (común, trabajos, posts)
│   │   └── en/          # Inglés (común, trabajos, posts)
│   └── images/          # Imágenes optimizadas
├── __tests__/           # Tests unitarios (70%+ cobertura)
├── docs/                # Documentación del sistema i18n
└── .github/             # Workflows CI/CD automatizados
```

## 🛠️ Desarrollo

### Prerrequisitos

- Node.js 22+ (requerido por Vercel)
- pnpm 8+ (**obligatorio para desarrollo**)

### Instalación

```bash
# Instalar pnpm globalmente si no lo tienes
npm install -g pnpm

# Clonar e instalar dependencias
git clone https://github.com/aalvaropc/aalvaropc-portfolio
cd aalvaropc-portfolio
pnpm install

# Los hooks de Git se configurarán automáticamente
```

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev                # Servidor de desarrollo con Turbopack
pnpm dev:network        # Desarrollo en red local
pnpm build              # Build de producción
pnpm start              # Servidor de producción

# Calidad de código (automáticos con hooks)
pnpm lint               # Linting
pnpm lint:fix           # Linting con auto-fix
pnpm format             # Formatear código con Prettier

# Testing
pnpm test               # Ejecutar tests
pnpm test:watch         # Tests en modo watch
pnpm test:coverage      # Reporte de cobertura
pnpm test:ci            # Tests para CI/CD

# CI/CD
pnpm precommit          # Pipeline completo de CI
```

### 🎣 Hooks de Git Automáticos

El proyecto incluye hooks automáticos que se ejecutan en diferentes momentos:

#### **Pre-commit** (antes de cada commit)

- ✨ **Lint-staged**: Ejecuta ESLint y Prettier solo en archivos modificados
- 🧪 **Tests**: Ejecuta tests solo si hay cambios en archivos de código
- ⚡ **Rápido**: Solo procesa archivos que cambiaron

#### **Commit-msg** (valida mensajes de commit)

- 📝 **Conventional Commits**: Valida formato `tipo(scope): descripción`
- 🏷️ **Tipos válidos**: feat, fix, docs, style, refactor, test, chore, etc.

#### **Pre-push** (antes de cada push)

- 🔨 **Build**: Verifica que el proyecto compile correctamente
- 🧪 **Tests completos**: Suite completa con cobertura
- 🔒 **Audit**: Verificación de vulnerabilidades de seguridad

### 💡 Flujo de Desarrollo Recomendado

```bash
# 1. Crear branch para nueva feature
git checkout -b feat/nueva-funcionalidad

# 2. Desarrollar con live reload
pnpm dev

# 3. Commit con formato conventional (hooks automáticos)
git add .
git commit -m "feat: add new awesome feature"
# ✅ Pre-commit ejecutará lint, format y tests automáticamente

# 4. Push al remoto (verificaciones completas)
git push origin feat/nueva-funcionalidad
# ✅ Pre-push ejecutará build, tests y audit automáticamente
```

## 🧪 Testing

El proyecto incluye una suite completa de tests:

```bash
# Ejecutar todos los tests
pnpm test

# Tests específicos
pnpm test -- __tests__/components/
pnpm test -- __tests__/pages/
pnpm test -- __tests__/lib/

# Con cobertura
pnpm test:coverage
```

### Cobertura Actual

- **Statements**: 88.4% (objetivo: 15%+)
- **Functions**: 75% (objetivo: 15%+)
- **Branches**: 68.7% (objetivo: 10%+)
- **Lines**: 89.6% (objetivo: 15%+)

### Tests por Componente

- **Components**: 114 tests cubriendo componentes críticos
- **Layouts**: Tests de article.js y main.jsx
- **Theme**: Configuración de Chakra UI testeada
- **Utilities**: Hooks y funciones auxiliares

## 🌍 Sistema de Internacionalización

Sistema completo de i18n con cobertura del 100% del contenido:

### 🌐 Idiomas Soportados

- 🇪🇸 **Español**: Idioma principal (detección por geolocalización)
- 🇺🇸 **Inglés**: Traducción completa y profesional

## 🚀 Despliegue

### Vercel (Recomendado)

```bash
# Instalación de Vercel CLI
pnpm add -g vercel

# Deploy
vercel --prod
```

### Variables de Entorno

```env
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🔄 CI/CD

El proyecto incluye GitHub Actions para:

- ✅ **Testing**: Ejecución automática de tests
- ✅ **Linting**: Verificación de calidad de código
- ✅ **Build**: Validación de construcción
- ✅ **Deploy**: Despliegue automático en producción

Ver [`.github/workflows/ci.yml`](./.github/workflows/ci.yml) para configuración completa.
