import { render, screen } from '@testing-library/react'
import React from 'react'

jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    t: (key, fallback) => fallback || key,
    getPosts: () => ({
      title: 'Publicaciones',
      articles: [
        {
          id: 'GrupoEstadistica',
          title: 'Grupo de Estadística',
          description: 'Study group'
        },
        {
          id: 'ArqBasadaEventos',
          title: 'Arquitectura Basada en Eventos',
          description: 'Event-driven talk'
        }
      ]
    })
  })
}))

import Posts from '../../pages/posts'

describe('Posts page', () => {
  it('renders the heading and post cards', () => {
    render(<Posts />)
    expect(
      screen.getByRole('heading', { name: /publicaciones/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Grupo de Estadística')).toBeInTheDocument()
    expect(
      screen.getByText('Arquitectura Basada en Eventos')
    ).toBeInTheDocument()
  })

  it('links each post to its detail page', () => {
    render(<Posts />)
    const hrefs = screen.getAllByRole('link').map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/posts/GrupoEstadistica')
    expect(hrefs).toContain('/posts/ArqBasadaEventos')
  })
})
