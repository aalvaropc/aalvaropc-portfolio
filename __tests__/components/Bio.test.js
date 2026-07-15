import { render, screen } from '@testing-library/react'
import React from 'react'
import { BioSection, BioYear } from '../../components/bio'

describe('Bio components', () => {
  it('BioSection renders its children inside a div', () => {
    render(<BioSection>content</BioSection>)
    const el = screen.getByText('content')
    expect(el.tagName).toBe('DIV')
  })

  it('BioYear renders its children inside a span', () => {
    render(<BioYear>2024</BioYear>)
    const el = screen.getByText('2024')
    expect(el.tagName).toBe('SPAN')
  })

  it('composes a year with its description', () => {
    render(
      <BioSection>
        <BioYear>2024</BioYear> Started career
      </BioSection>
    )
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText(/Started career/)).toBeInTheDocument()
  })
})
