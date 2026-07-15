import Head from 'next/head'
import { Loader2 } from 'lucide-react'
import SiteNavbar from '../site-navbar'
import SiteFooter from '../site-footer'
import { useI18n } from '../../lib/i18nContext'

export default function Shell({ children, router }) {
  const { isLoading } = useI18n()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Alvaro Peña — Backend Engineer</title>
        <meta
          name="description"
          content="Backend-focused Full Stack Developer especializado en Go, Python y Java. Arquitecturas escalables y sistemas distribuidos."
        />
      </Head>

      <SiteNavbar path={router?.asPath} />

      <main className="mx-auto max-w-2xl px-4 pb-16 pt-24 sm:px-6">
        {children}
        <SiteFooter />
      </main>
    </div>
  )
}
