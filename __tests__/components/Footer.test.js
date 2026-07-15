import { render, screen } from '@testing-library/react'
import React from 'react'
import SiteFooter from '../../components/site-footer'

describe('SiteFooter', () => {
  it('renders the copyright with the name', () => {
    render(<SiteFooter />)
    expect(screen.getByText(/Alvaro Peña/)).toBeInTheDocument()
  })

  it('renders social links with accessible labels', () => {
    render(<SiteFooter />)
    expect(screen.getByLabelText('GitHub')).toHaveAttribute(
      'href',
      'https://github.com/aalvaropc'
    )
    expect(screen.getByLabelText('LinkedIn')).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/aalvarop-pe/'
    )
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'href',
      'mailto:aalvaropc@gmail.com'
    )
  })
})
