import { render, screen } from '@testing-library/react'
import React from 'react'
import ArticleLayout from '../../components/layouts/article'

describe('Article layout', () => {
  it('renders its children', () => {
    render(<ArticleLayout>Article content</ArticleLayout>)
    expect(screen.getByText('Article content')).toBeInTheDocument()
  })

  it('renders inside an <article> element', () => {
    render(<ArticleLayout>x</ArticleLayout>)
    expect(screen.getByText('x').closest('article')).toBeInTheDocument()
  })

  it('still renders children when a title is provided', () => {
    render(<ArticleLayout title="Test Article">content</ArticleLayout>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })
})
