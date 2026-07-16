import { useState } from 'react'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import SiteLogo from './site-logo'
import ThemeToggle from './theme-toggle'
import LanguageToggle from './language-toggle'
import { useI18n } from '../lib/i18nContext'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

const NavLink = ({ href, active, external, children, onClick }) => {
  const cls = cn(
    'relative px-1 py-1 text-sm transition-colors',
    active
      ? 'text-foreground'
      : 'text-muted-foreground hover:text-foreground'
  )
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      href={href}
      className={cls}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      {children}
      {active && (
        <span className="absolute -bottom-[3px] left-0 h-px w-full bg-foreground" />
      )}
    </Link>
  )
}

export default function SiteNavbar({ path }) {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)

  // /works queda fuera de la navegación mientras los proyectos estén ocultos
  // (lib/works-visibility.js): enlazarlo llevaría a un estado vacío.
  const links = [
    { href: '/posts', label: t('nav.posts', 'Publicaciones') },
    {
      href: '/certificates',
      label: t('nav.certificates', 'Certificados')
    },
    // Enlace directo: antes pasaba por un acortador (acortar.link), que oculta
    // el destino y añade un tercero del que depende el CV.
    {
      href: 'https://drive.google.com/file/d/1MQQGCNFTuKcpCKGBwb6j48TuKngJ-kGI/view',
      label: 'CV',
      external: true
    }
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-4 px-4 sm:px-6">
        <SiteLogo />

        {/* Desktop links */}
        <div className="hidden shrink-0 items-center gap-5 md:flex">
          {links.map(link => (
            <NavLink
              key={link.label}
              href={link.href}
              active={path === link.href}
              external={link.external}
            >
              <span className="whitespace-nowrap">{link.label}</span>
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageToggle />
          </div>
          <ThemeToggle />

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Abrir menú"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground/80 transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle className="text-left font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {t('nav.menu', 'Menú')}
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-1 px-4">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {t('nav.home', 'Inicio')}
                  </Link>
                  {links.map(link =>
                    link.external ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className="py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                  <div className="mt-4 border-t border-border pt-4">
                    <LanguageToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
