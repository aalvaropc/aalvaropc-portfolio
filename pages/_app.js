import '../styles/globals.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '../components/theme-provider'
import { I18nProvider } from '../lib/i18nContext'
import Shell from '../components/layouts/shell'

const Website = ({ Component, pageProps, router }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <I18nProvider>
        <div
          className={`${GeistSans.variable} ${GeistMono.variable} font-sans text-foreground`}
        >
          <Shell router={router}>
            <AnimatePresence mode="wait" initial={true}>
              <Component {...pageProps} key={router.route} />
            </AnimatePresence>
          </Shell>
        </div>
      </I18nProvider>
    </ThemeProvider>
  )
}

export default Website
