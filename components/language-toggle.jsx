import { useI18n } from '../lib/i18nContext'
import { cn } from '@/lib/utils'

// Minimal ES/EN segmented toggle — matches the clean/dev aesthetic.
export default function LanguageToggle({ className }) {
  const { locale, changeLocale, supportedLocales } = useI18n()

  const langs = [
    { code: 'es', label: 'ES' },
    { code: 'en', label: 'EN' }
  ].filter(l => supportedLocales?.includes(l.code))

  if (langs.length === 0) return null

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border border-border p-0.5 text-xs font-medium',
        className
      )}
      role="group"
      aria-label="Cambiar idioma"
    >
      {langs.map(lang => {
        const active = locale === lang.code
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => changeLocale(lang.code)}
            aria-pressed={active}
            className={cn(
              'rounded px-2 py-1 font-mono tracking-wide transition-colors',
              active
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {lang.label}
          </button>
        )
      })}
    </div>
  )
}
