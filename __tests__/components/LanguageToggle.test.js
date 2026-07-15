import { render, screen } from '@testing-library/react'
import React from 'react'
import LanguageToggle from '../../components/language-toggle'

describe('LanguageToggle', () => {
  it('renders ES and EN options from supported locales', () => {
    render(<LanguageToggle />)
    expect(screen.getByRole('button', { name: 'ES' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'EN' })).toBeInTheDocument()
  })
})
