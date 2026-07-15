import NextLink from 'next/link'

const NotFound = () => {
  return (
    <div className="py-16 text-center">
      <p className="label-mono mb-4">Error 404</p>
      <h1 className="text-3xl font-semibold tracking-tight">
        Página no encontrada
      </h1>
      <p className="mt-3 text-muted-foreground">
        La página que buscas no existe o fue movida.
      </p>
      <div className="mt-8">
        <NextLink
          href="/"
          className="inline-flex items-center gap-1.5 rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Volver al inicio
        </NextLink>
      </div>
    </div>
  )
}

export default NotFound
