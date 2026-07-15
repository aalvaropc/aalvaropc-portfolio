import { render, screen } from '@testing-library/react'
import React from 'react'

jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    t: (key, fallback) => fallback || key,
    getWorks: () => ({
      title: 'Proyectos',
      projects: [
        { id: 'rmap', title: 'Rmap', description: 'Recycling app' },
        { id: 'cineflix', title: 'Cineflix', description: 'Cinema database' }
      ]
    })
  })
}))

import Works from '../../pages/works'

describe('Works page', () => {
  it('renders the heading and project cards', () => {
    render(<Works />)
    expect(
      screen.getByRole('heading', { name: /proyectos/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Rmap')).toBeInTheDocument()
    expect(screen.getByText('Cineflix')).toBeInTheDocument()
  })

  it('links each project to its detail page', () => {
    render(<Works />)
    const hrefs = screen.getAllByRole('link').map(l => l.getAttribute('href'))
    expect(hrefs).toContain('/works/rmap')
    expect(hrefs).toContain('/works/cineflix')
  })
})
