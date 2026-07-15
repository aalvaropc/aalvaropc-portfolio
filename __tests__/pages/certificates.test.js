import { render, screen } from '@testing-library/react'
import React from 'react'
import Certificates from '../../pages/certificates'
import { certificates } from '../../lib/certificates'

describe('Certificates page', () => {
  it('renders the heading', () => {
    render(<Certificates />)
    expect(
      screen.getByRole('heading', { name: /certificados/i })
    ).toBeInTheDocument()
  })

  it('shows each certificate with its issuer', () => {
    render(<Certificates />)
    const first = certificates[0]
    expect(screen.getByText(first.title)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(first.issuer, 'i'))).toBeInTheDocument()
  })

  it('links each certificate to its badge URL', () => {
    render(<Certificates />)
    const hrefs = screen.getAllByRole('link').map(l => l.getAttribute('href'))
    certificates
      .filter(c => c.badgeUrl && c.badgeUrl !== '#')
      .forEach(c => expect(hrefs).toContain(c.badgeUrl))
  })
})
