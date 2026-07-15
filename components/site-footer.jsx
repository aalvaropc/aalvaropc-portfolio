import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const socials = [
  { href: 'https://github.com/aalvaropc', label: 'GitHub', Icon: FiGithub },
  {
    href: 'https://www.linkedin.com/in/aalvarop-pe/',
    label: 'LinkedIn',
    Icon: FiLinkedin
  },
  { href: 'mailto:aalvaropc@gmail.com', label: 'Email', Icon: FiMail }
]

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 py-10">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Alvaro Peña
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
