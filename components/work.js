import NextLink from 'next/link'
import { ChevronRight } from 'lucide-react'

export const Title = ({ children }) => (
  <div className="mb-6">
    <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
      <NextLink
        href="/works"
        className="transition-colors hover:text-foreground"
      >
        Proyectos
      </NextLink>
      <ChevronRight className="h-3.5 w-3.5" />
    </div>
    <h1 className="text-2xl font-semibold tracking-tight">{children}</h1>
  </div>
)

export const WorkImage = ({ src, alt }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={src}
    alt={alt}
    loading="lazy"
    className="my-4 w-full rounded-lg border border-border"
  />
)

export const Meta = ({ children }) => (
  <span className="mr-2 inline-flex items-center rounded bg-secondary px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
    {children}
  </span>
)
