import { cn } from '@/lib/utils'

export const BioSection = ({ children, className }) => (
  <div className={cn('pl-[3.4em] -indent-[3.4em]', className)}>{children}</div>
)

export const BioYear = ({ children }) => (
  <span className="mr-4 font-bold">{children}</span>
)
