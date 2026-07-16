/**
 * Integration-ish smoke test: the home page renders its main sections together.
 */
import { render, screen } from '@testing-library/react'
import React from 'react'
import Home from '../../pages/index'

describe('Home page integration', () => {
  it('renders hero, experience and stack content together', () => {
    render(<Home />)
    expect(
      screen.getByRole('heading', { name: /alvaro peña/i })
    ).toBeInTheDocument()
    expect(screen.getByText('Software Engineer')).toBeInTheDocument()
    expect(screen.getByText('Google Developer Group Ica')).toBeInTheDocument()
    expect(screen.getByText('AWS')).toBeInTheDocument()
  })

  it('does not send visitors to the empty projects page', () => {
    render(<Home />)
    const worksLink = screen
      .getAllByRole('link')
      .find(l => l.getAttribute('href') === '/works')
    expect(worksLink).toBeUndefined()
  })
})
