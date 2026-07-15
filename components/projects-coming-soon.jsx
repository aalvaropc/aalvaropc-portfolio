import { Hammer } from 'lucide-react'
import { FiGithub } from 'react-icons/fi'

export default function ProjectsComingSoon({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-20 text-center">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full border border-border text-muted-foreground">
        <Hammer className="h-5 w-5" />
      </div>
      <h2 className="text-lg font-medium">
        {title || 'Trabajando en nuevos proyectos'}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description ||
          'Estoy construyendo cosas nuevas. Vuelve pronto para verlas.'}
      </p>
      <a
        href="https://github.com/aalvaropc"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
      >
        <FiGithub className="h-4 w-4" />
        GitHub
      </a>
    </div>
  )
}
