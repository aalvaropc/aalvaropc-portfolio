import { motion } from 'framer-motion'

// Subtle fade-up on mount — staggered via `delay`. Mount-based (not scroll-based)
// so content is always reliably visible, even without JS-driven scroll events.
export default function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
