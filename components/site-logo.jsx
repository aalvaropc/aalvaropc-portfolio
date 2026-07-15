import Link from 'next/link'

export default function SiteLogo() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Alvaro Peña — inicio"
    >
      <span className="grid size-6 place-items-center rounded-md bg-brand font-mono text-[13px] font-bold leading-none text-brand-foreground transition-transform duration-300 group-hover:-rotate-6">
        a
      </span>
      <span className="whitespace-nowrap text-sm font-semibold">
        Alvaro Peña
      </span>
    </Link>
  )
}
