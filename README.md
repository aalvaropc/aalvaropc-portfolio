# Portfolio - Alvaro Peña

[![CI/CD](https://github.com/aalvaropc/portafolio/actions/workflows/ci.yml/badge.svg)](https://github.com/aalvaropc/portafolio/actions)
[![Test Coverage](https://img.shields.io/badge/coverage-70%25-brightgreen)](https://github.com/aalvaropc/portafolio)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.1-blue)](https://reactjs.org/)
[![i18n](https://img.shields.io/badge/i18n-ES%20%7C%20EN-success)](https://github.com/aalvaropc/portafolio)

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

### 🧪 Testing
- **Cobertura completa**: 70%+ en líneas, funciones y ramas
- **Testing Library**: React Testing Library con Jest
- **CI/CD**: Pipeline automatizado con GitHub Actions
- **Tests unitarios**: Components, hooks y utilidades

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
- **Testing**: Jest, React Testing Library (70%+ cobertura)
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

- Node.js 18+
- npm o yarn

### Instalación

```bash
git clone https://github.com/aalvaropc/portafolio.git
cd portafolio
npm install
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build           # Build de producción
npm run start           # Servidor de producción
npm run lint            # Linting

# Testing
npm test                # Ejecutar tests
npm run test:watch      # Tests en modo watch
npm run test:coverage   # Reporte de cobertura

# CI/CD
npm run ci              # Pipeline completo de CI
```

## 🧪 Testing

El proyecto incluye una suite completa de tests:

```bash
# Ejecutar todos los tests
npm test

# Tests específicos
npm test -- __tests__/components/
npm test -- __tests__/pages/
npm test -- __tests__/lib/

# Con cobertura
npm run test:coverage
```

### Cobertura Objetivo
- **Líneas**: 70%+
- **Funciones**: 70%+
- **Ramas**: 70%+
- **Declaraciones**: 70%+

## 🌍 Sistema de Internacionalización

Sistema completo de i18n con cobertura del 100% del contenido:

### 🎯 Cobertura Completa
- ✅ **Páginas principales**: Home, Works, Posts
- ✅ **Páginas individuales**: 10 proyectos + 2 publicaciones
- ✅ **Componentes**: Navbar, Footer, Meta tags
- ✅ **Contenido dinámico**: Experiencia, skills, intereses
- ✅ **Metadatos**: Repository, Platform, Stack, etc.

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
npm i -g vercel

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
