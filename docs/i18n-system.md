# Sistema de Internacionalización (i18n)

## Descripción General

El portafolio incluye un sistema completo de internacionalización que soporta múltiples idiomas con detección automática basada en geolocalización y preferencias del navegador.

## Características

### 🌍 Detección Automática de Idioma
- **Geolocalización**: Detecta el país del usuario y selecciona el idioma apropiado
- **Navegador**: Fallback al idioma preferido del navegador
- **Persistencia**: Guarda la preferencia del usuario en localStorage
- **Fallback**: Español como idioma predeterminado

### 🔧 Tecnologías Utilizadas
- React Context API para estado global
- Custom hooks para manejo de estado
- JSON para almacenamiento de traducciones
- Chakra UI para componentes del selector

### 📁 Estructura de Archivos

```
public/locales/
├── es/
│   ├── common.json    # Traducciones generales
│   ├── works.json     # Proyectos y trabajos
│   └── posts.json     # Blog y publicaciones
└── en/
    ├── common.json
    ├── works.json
    └── posts.json

lib/
├── useLocaleDetection.js    # Hook para detección de idioma
├── useTranslations.js       # Hook para carga de traducciones
└── i18nContext.js          # Contexto global de i18n

components/
├── LanguageSelector.js     # Selector de idioma
└── LoadingScreen.js       # Pantalla de carga
```

## Implementación

### 1. Configuración Inicial

El sistema se inicializa en `_app.js`:

```javascript
import { I18nProvider } from '../lib/i18nContext';

function Website({Component, pageProps, router}) {
  return (
    <ChakraProvider theme={theme}>
      <I18nProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </ChakraProvider>
  )
}
```

### 2. Uso en Componentes

```javascript
import { useI18n } from '../lib/i18nContext'

function MiComponente() {
  const { t, locale, changeLocale, getHero, getWorks } = useI18n()
  
  return (
    <div>
      <h1>{t('hero.title', 'Título por defecto')}</h1>
      <p>{getHero().description}</p>
    </div>
  )
}
```

### 3. Selector de Idioma

El componente `LanguageSelector` se incluye automáticamente en el navbar y proporciona:
- Banderas de países como iconos
- Menú desplegable con opciones
- Estado de carga mientras se detecta el idioma
- Persistencia de la selección

## Configuración de Idiomas

### Agregar un Nuevo Idioma

1. **Crear archivos de traducción**:
   ```
   public/locales/fr/
   ├── common.json
   ├── works.json
   └── posts.json
   ```

2. **Actualizar la detección**:
   ```javascript
   // lib/useLocaleDetection.js
   const SUPPORTED_LOCALES = ['es', 'en', 'fr']
   ```

3. **Actualizar el selector**:
   ```javascript
   // components/LanguageSelector.js
   const languages = [
     { code: 'es', name: 'Español', flag: '🇪🇸' },
     { code: 'en', name: 'English', flag: '🇺🇸' },
     { code: 'fr', name: 'Français', flag: '🇫🇷' }
   ]
   ```

### Estructura de Archivos JSON

```json
{
  "hero": {
    "greeting": "¡Hola! Soy Alvaro 👋",
    "title": "Backend-focused Full Stack Developer",
    "description": "Descripción del desarrollador..."
  },
  "nav": {
    "home": "Inicio",
    "projects": "Proyectos",
    "posts": "Publicaciones"
  }
}
```

## Hooks Disponibles

### useI18n()
Hook principal que proporciona:
- `locale`: Idioma actual
- `changeLocale(newLocale)`: Cambiar idioma
- `t(key, defaultValue)`: Función de traducción
- `isLoading`: Estado de carga
- Funciones helper: `getHero()`, `getWorks()`, `getPosts()`

### useLocaleDetection()
Hook para detección automática:
- Geolocalización por país
- Preferencias del navegador
- localStorage para persistencia

### useTranslations(locale, namespace)
Hook para carga de traducciones específicas:
- Cache automático
- Manejo de errores
- Fallback a español

## Testing

El sistema incluye tests completos:

```bash
npm test __tests__/components/LanguageSelector.test.js
```

**Tests incluidos**:
- ✅ Renderizado con idioma por defecto
- ✅ Cambio de idioma funcional
- ✅ Persistencia en localStorage
- ✅ Manejo de errores de red
- ✅ Funcionamiento general del selector

## Mejores Prácticas

### 1. Claves de Traducción
```javascript
// ✅ Buena práctica
t('hero.title', 'Título por defecto')

// ❌ Evitar
t('titulo-hero')
```

### 2. Organización de Archivos
- `common.json`: Elementos compartidos (nav, footer, etc.)
- `works.json`: Contenido específico de proyectos
- `posts.json`: Contenido de blog y publicaciones

### 3. Manejo de Estado
```javascript
// ✅ Usar el contexto global
const { locale, changeLocale } = useI18n()

// ❌ Evitar estado local para idioma
const [language, setLanguage] = useState('es')
```

## Países Soportados

### Español (Países hispanohablantes)
Argentina, Bolivia, Chile, Colombia, Costa Rica, Cuba, República Dominicana, Ecuador, El Salvador, Guinea Ecuatorial, Guatemala, Honduras, México, Nicaragua, Panamá, Paraguay, Perú, Puerto Rico, España, Uruguay, Venezuela

### Inglés (Resto del mundo)
Todos los demás países por defecto

## Deployment

El sistema funciona completamente en el cliente y no requiere configuración adicional en el servidor. Los archivos JSON se sirven estáticamente desde la carpeta `public/locales/`.

## Troubleshooting

### Problema: Traducciones no se cargan
**Solución**: Verificar que los archivos JSON están en `public/locales/[locale]/[namespace].json`

### Problema: Idioma no se detecta correctamente
**Solución**: Verificar permisos de geolocalización en el navegador

### Problema: Tests fallan
**Solución**: Asegurar que `window.matchMedia` está mockeado en jest.setup.js

## Roadmap

- [ ] Soporte para RTL (árabe, hebreo)
- [ ] Pluralización inteligente
- [ ] Interpolación de variables avanzada
- [ ] Lazy loading de traducciones
- [ ] CDN para archivos de traducción