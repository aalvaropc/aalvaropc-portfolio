import { motion } from 'framer-motion'
import Head from 'next/head'

const variants = {
  hidden: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 16 }
}

const Layout = ({ children, title }) => {
  const pageTitle = `${title} - Alvaro Peña`
  return (
    <motion.article
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {title && (
        <Head>
          <title>{pageTitle}</title>
          <meta name="twitter:title" content={pageTitle} />
          <meta property="og:title" content={pageTitle} />
        </Head>
      )}
      {children}
    </motion.article>
  )
}

export default Layout
