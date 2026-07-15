import { render, screen } from '@testing-library/react'
import React from 'react'
import ThemeToggle from '../../components/theme-toggle'

describe('ThemeToggle', () => {
  it('renders a toggle button', () => {
    render(<ThemeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('exposes an accessible label', () => {
    render(<ThemeToggle />)
    // next-themes is mocked to "dark", so it should offer switching to light
    expect(
      screen.getByRole('button', { name: /modo claro|modo oscuro/i })
    ).toBeInTheDocument()
  })
})
