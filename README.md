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
- **Selector minimalista**: Interfaz limpia con banderas de país
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
- **Desarrollo**: ESLint, Prettier, TypeScript support
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
- pnpm 8+ (recomendado)

### Instalación

```bash
git clone https://github.com/aalvaropc/aalvaropc-portfolio
cd aalvaropc-portfolio
pnpm install
```

### Scripts Disponibles

```bash
# Desarrollo
pnpm dev                # Servidor de desarrollo
pnpm build              # Build de producción
pnpm start              # Servidor de producción
pnpm lint               # Linting

# Testing
pnpm test               # Ejecutar tests
pnpm test:watch         # Tests en modo watch
pnpm test:coverage      # Reporte de cobertura

# CI/CD
pnpm precommit          # Pipeline completo de CI
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

### ⚙️ Arquitectura Técnica
- **Contexto React**: `useI18n()` para estado global
- **Hooks personalizados**: `useTranslations()`, `useWorkDetail()`, `usePostDetail()`
- **JSON estructurado**: Contenido separado por namespaces
- **Fallback inteligente**: Sistema robusto de respaldo
- **Persistencia**: LocalStorage para preferencias del usuario

### 🎨 Interfaz Minimalista
- **Selector compacto**: Solo banderas en desktop
- **Menú móvil**: Funcionalidad completa en responsive
- **Transiciones suaves**: Cambio instantáneo de idioma

Ver [documentación técnica completa](./docs/i18n-system.md) para implementación detallada.

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

## 📊 Métricas y Monitoreo

- **Lighthouse Score**: 95+ en todas las categorías
- **Core Web Vitals**: Cumple con estándares de Google
- **Bundle Size**: Optimizado para carga rápida
- **SEO Score**: 100/100

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones

- **Commits**: Seguir [Conventional Commits](https://conventionalcommits.org/)
- **Código**: ESLint + Prettier
- **Tests**: Obligatorios para nuevas funcionalidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

### Alvaro Peña - Backend Developer

- 🌐 **Website**: [aalvaropc.vercel.app](https://aalvaropc.vercel.app)
- 💼 **LinkedIn**: [aalvarop-pe](https://linkedin.com/in/aalvarop-pe/)
- 📧 **Email**: [aalvaropc@gmail.com](mailto:aalvaropc@gmail.com)
- 🐱 **GitHub**: [aalvaropc](https://github.com/aalvaropc)

---

⭐ **Si te gusta este proyecto, ¡no olvides darle una estrella!**

🔥 **Stack**: Go • Python • Java • FastAPI • Spring Boot • PostgreSQL • Redis • Docker • AWS • GCP
