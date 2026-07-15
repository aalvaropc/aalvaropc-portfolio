import { render, screen } from '@testing-library/react'
import React from 'react'

// No works-visibility mock here: the real flag (HIDE_ALL_PROJECTS) applies.
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
import { HIDE_ALL_PROJECTS } from '../../lib/works-visibility'

// This suite documents the current "coming soon" state. It only asserts the
// empty state while all projects are hidden.
const maybe = HIDE_ALL_PROJECTS ? describe : describe.skip

maybe('Works page (all projects hidden)', () => {
  it('hides every project and shows the coming-soon state', () => {
    render(<Works />)
    expect(
      screen.getByText(/trabajando en nuevos proyectos/i)
    ).toBeInTheDocument()
    const hrefs = screen.getAllByRole('link').map(l => l.getAttribute('href'))
    expect(hrefs).not.toContain('/works/rmap')
    expect(hrefs).not.toContain('/works/cineflix')
  })
})
