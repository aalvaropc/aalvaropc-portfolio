import NextLink from 'next/link'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Tailwind drop-in replacements for the Chakra primitives used across the
// works/posts detail pages. Same prop names where it matters; Chakra-only
// layout props (ml/my/mr/mx/maxW) are intentionally ignored (spacing is baked in).

export const Container = ({ children, className }) => (
  <div className={cn('w-full', className)}>{children}</div>
)

export const Badge = ({ children, className }) => (
  <span
    className={cn(
      'ml-1 inline-flex items-center rounded-md bg-secondary px-1.5 py-0.5 align-middle text-xs font-medium text-secondary-foreground',
      className
    )}
  >
    {children}
  </span>
)

export const Link = ({ href = '#', children, className, ...rest }) => {
  const external = /^https?:/.test(href)
  const common = cn(
    'text-brand underline-offset-2 hover:underline break-words',
    className
  )
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={common}
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <NextLink href={href} className={common} {...rest}>
      {children}
    </NextLink>
  )
}

export const List = ({ children, className }) => (
  <ul className={cn('my-4 space-y-2', className)}>{children}</ul>
)

export const ListItem = ({ children, className }) => (
  <li className={cn('text-[15px] leading-relaxed text-foreground/80', className)}>
    {children}
  </li>
)

export const AspectRatio = ({ children, ratio = 16 / 9, maxW }) => (
  <div
    className="my-6 w-full overflow-hidden rounded-lg border border-border [&>iframe]:h-full [&>iframe]:w-full [&>iframe]:border-0"
    style={{ aspectRatio: ratio, maxWidth: maxW }}
  >
    {children}
  </div>
)

export const ExternalLinkIcon = ({ className }) => (
  <ArrowUpRight
    className={cn('inline h-3.5 w-3.5 align-text-bottom', className)}
  />
)

export const Text = ({ children, className }) => (
  <p className={cn('text-foreground/80', className)}>{children}</p>
)

export const Spinner = ({ className }) => (
  <Loader2 className={cn('h-6 w-6 animate-spin text-muted-foreground', className)} />
)
