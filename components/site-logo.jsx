import Link from 'next/link'

export default function SiteLogo() {
  return (
    <Link
      href="/"
      className="group inline-flex min-h-[24px] items-center gap-2 rounded-md py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Alvaro Peña — inicio"
    >
      <span
        aria-hidden="true"
        className="font-mono text-[17px] font-bold leading-none text-brand transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        ~
      </span>
      <span className="whitespace-nowrap text-sm font-semibold">
        Alvaro Peña
      </span>
    </Link>
  )
}
