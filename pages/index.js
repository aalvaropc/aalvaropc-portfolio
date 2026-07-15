import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useI18n } from '../lib/i18nContext'
import Reveal from '../components/reveal'
import { cn } from '@/lib/utils'

const experience = [
  {
    period: '2026 — Presente',
    position: 'Support Engineer',
    company: 'Shinkansen',
    active: true,
    i18n: 0
  },
  {
    period: '2025',
    position: 'Backend Developer',
    company: 'Guinea Mobile',
    i18n: 1
  },
  {
    period: '2024 — 2025',
    position: 'Centers Junior',
    company: 'NTT Data',
    i18n: 2
  },
  {
    period: '2023 — 2024',
    position: 'Full-Stack Junior',
    company: 'Proveedy',
    i18n: 3
  },
  {
    period: '2023 — Presente',
    position: 'Miembro',
    company: 'Google Developer Group Ica',
    i18n: 4
  }
]

const stack = [
  { label: 'Languages', items: ['Go', 'Python', 'Java'] },
  { label: 'Backend', items: ['FastAPI', 'Spring Boot', 'RabbitMQ'] },
  { label: 'Data', items: ['PostgreSQL', 'Redis'] },
  { label: 'Cloud / DevOps', items: ['Docker', 'GCP', 'AWS'] }
]

const socials = [
  { href: 'https://github.com/aalvaropc', label: 'GitHub', Icon: FiGithub },
  {
    href: 'https://www.linkedin.com/in/aalvarop-pe/',
    label: 'LinkedIn',
    Icon: FiLinkedin
  },
  { href: 'mailto:aalvaropc@gmail.com', label: 'Email', Icon: FiMail }
]

function SectionLabel({ children }) {
  return <p className="label-mono mb-5">{children}</p>
}

const Page = () => {
  const { t } = useI18n()

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="pt-4">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {t('hero.available', 'Disponible para proyectos')}
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
            {t('common.name', 'Alvaro Peña')}
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-3 text-lg text-muted-foreground">
            {t('hero.title', 'Systems Engineer')}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/works"
              className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              {t('nav.projects', 'Ver proyectos')}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:aalvaropc@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              {t('contactMe.cta', 'Contáctame')}
            </a>
            <div className="ml-1 flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={
                    href.startsWith('mailto:')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* About */}
      <section className="mt-24">
        <Reveal>
          <SectionLabel>{t('about.title', 'Sobre mí')}</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="space-y-4 text-[15px] leading-relaxed text-foreground/80">
            <p>
              {t(
                'about.description1',
                'Backend-focused Full Stack Developer especializado en diseñar arquitecturas escalables con Go, Python y Java. Experiencia construyendo servicios REST, sistemas en tiempo real y microservicios distribuidos.'
              )}
            </p>
            <p>
              {t(
                'about.description2',
                'Miembro del Google Developer Group Ica, contribuyendo al crecimiento de la comunidad tech local mediante eventos y mentoría.'
              )}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Experience */}
      <section className="mt-24">
        <Reveal>
          <SectionLabel>{t('experience.title', 'Experiencia')}</SectionLabel>
        </Reveal>
        <div className="flex flex-col">
          {experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.04}>
              <div
                className={cn(
                  'group grid grid-cols-[7rem_1fr] gap-x-4 border-t border-border py-5 sm:grid-cols-[9rem_1fr]',
                  i === experience.length - 1 && 'border-b'
                )}
              >
                <div className="pt-0.5 font-mono text-xs text-muted-foreground">
                  {t(`experience.jobs.${job.i18n}.period`, job.period)}
                </div>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-medium text-foreground">
                    {t(`experience.jobs.${job.i18n}.position`, job.position)}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">
                    {t(`experience.jobs.${job.i18n}.company`, job.company)}
                  </span>
                  {job.active && (
                    <span className="ml-1 inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      {t('experience.current', 'Actual')}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="mt-24">
        <Reveal>
          <SectionLabel>{t('skills.title', 'Stack')}</SectionLabel>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2">
          {stack.map((group, i) => (
            <Reveal key={group.label} delay={i * 0.04}>
              <div>
                <p className="mb-3 text-sm font-medium text-foreground">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(item => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-xs text-foreground/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mt-24">
        <Reveal>
          <SectionLabel>{t('contactMe.title', 'Contáctame')}</SectionLabel>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-lg font-medium">
              {t('contactMe.heading', '¿Tienes un proyecto interesante?')}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {t('contactMe.description', 'Hablemos. Respondo rápido.')}
            </p>
            <a
              href="mailto:aalvaropc@gmail.com"
              className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <Mail className="h-4 w-4" />
              aalvaropc@gmail.com
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

export default Page
