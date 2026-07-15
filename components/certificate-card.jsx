import Image from 'next/image'
import { Award, ArrowUpRight } from 'lucide-react'

export default function CertificateCard({ certificate, viewLabel }) {
  const { title, issuer, date, badgeUrl, image } = certificate
  const hasLink = Boolean(badgeUrl) && badgeUrl !== '#'

  const body = (
    <div className="flex items-center gap-4">
      {image ? (
        <div className="flex h-16 w-16 shrink-0 items-center justify-center">
          <Image
            src={image}
            alt={title}
            width={64}
            height={64}
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
          <Award className="h-5 w-5 text-brand" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <h3 className="font-medium leading-tight">{title}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {issuer}
          {date ? ` · ${date}` : ''}
        </p>
      </div>

      {hasLink && (
        <span className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          <span className="hidden sm:inline">{viewLabel || 'Ver credencial'}</span>
          <ArrowUpRight className="h-4 w-4" />
        </span>
      )}
    </div>
  )

  if (!hasLink) {
    return (
      <div className="rounded-xl border border-border bg-card p-5">{body}</div>
    )
  }

  return (
    <a
      href={badgeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — ${viewLabel || 'ver credencial'}`}
      className="group block rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {body}
    </a>
  )
}
