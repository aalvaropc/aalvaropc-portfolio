import { cn } from '@/lib/utils'

const Paragraph = ({ children, className }) => (
  <p className={cn('my-3 text-justify leading-relaxed text-foreground/80', className)}>
    {children}
  </p>
)

export default Paragraph
