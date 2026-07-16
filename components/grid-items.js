import NextLink from 'next/link'
import Image from 'next/image'

const CardImage = ({ thumbnail, alt }) => (
  <div className="overflow-hidden rounded-lg border border-border bg-card">
    <Image
      src={thumbnail}
      alt={alt}
      width={600}
      height={400}
      quality={85}
      loading="lazy"
      className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
    />
  </div>
)

export const GridItem = ({ children, href, title, thumbnail }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group block"
  >
    <CardImage thumbnail={thumbnail} alt={title} />
    <h3 className="mt-3 font-medium transition-colors group-hover:text-brand">
      {title}
    </h3>
    <p className="mt-1 text-sm text-muted-foreground">{children}</p>
  </a>
)

export const WorkGridItem = ({ children, id, title, thumbnail }) => (
  <NextLink href={`/works/${id}`} className="group block">
    <CardImage thumbnail={thumbnail} alt={`Proyecto: ${title}`} />
    <h3 className="mt-3 text-lg font-semibold tracking-tight transition-colors group-hover:text-brand">
      {title}
    </h3>
    <p className="mt-1 text-sm text-muted-foreground">{children}</p>
  </NextLink>
)

export const PostGridItem = ({
  children,
  id,
  title,
  thumbnail,
  date,
  readTime,
  locale
}) => (
  <NextLink href={`/posts/${id}`} className="group block">
    <CardImage thumbnail={thumbnail} alt={`Publicación: ${title}`} />
    {(date || readTime) && (
      <p className="mt-3 font-mono text-xs text-muted-foreground">
        {date && (
          <time dateTime={date}>
            {new Date(`${date}T00:00:00`).toLocaleDateString(
              locale === 'en' ? 'en-US' : 'es-ES',
              { year: 'numeric', month: 'short' }
            )}
          </time>
        )}
        {date && readTime && <span aria-hidden="true"> · </span>}
        {readTime}
      </p>
    )}
    <h3 className="mt-1 text-lg font-semibold tracking-tight transition-colors group-hover:text-brand">
      {title}
    </h3>
    <p className="mt-1 text-sm text-muted-foreground">{children}</p>
  </NextLink>
)
