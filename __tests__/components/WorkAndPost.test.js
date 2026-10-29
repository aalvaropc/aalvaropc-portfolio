import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  Title as WorkTitle,
  WorkImage,
  Meta as WorkMeta
} from '../../components/work'
import {
  Title as PostTitle,
  PostImage,
  Meta as PostMeta
} from '../../components/post'

let mockTranslations = {}

jest.mock('../../lib/i18nContext', () => ({
  useI18n: () => ({
    t: (key, fallback) => mockTranslations[key] || fallback || key
  })
}))

afterEach(() => {
  mockTranslations = {}
})

describe('Work components', () => {
  it('Title shows a breadcrumb to /works and the heading', () => {
    render(<WorkTitle>My Project</WorkTitle>)
    expect(screen.getByRole('link', { name: 'Proyectos' })).toHaveAttribute(
      'href',
      '/works'
    )
    expect(
      screen.getByRole('heading', { name: 'My Project' })
    ).toBeInTheDocument()
  })

  it('Title translates the breadcrumb when the locale is English', () => {
    mockTranslations = { 'nav.projects': 'Projects' }
    render(<WorkTitle>My Project</WorkTitle>)
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/works'
    )
    expect(screen.queryByText('Proyectos')).not.toBeInTheDocument()
  })

  it('WorkImage renders an <img>', () => {
    render(<WorkImage src="/a.png" alt="A" />)
    const img = screen.getByAltText('A')
    expect(img).toHaveAttribute('src', '/a.png')
    expect(img.tagName).toBe('IMG')
  })

  it('Meta renders its label', () => {
    render(<WorkMeta>Stack</WorkMeta>)
    expect(screen.getByText('Stack')).toBeInTheDocument()
  })
})

describe('Post components', () => {
  it('Title shows a breadcrumb to /posts', () => {
    render(<PostTitle>My Post</PostTitle>)
    expect(screen.getByRole('link', { name: 'Publicaciones' })).toHaveAttribute(
      'href',
      '/posts'
    )
    expect(screen.getByRole('heading', { name: 'My Post' })).toBeInTheDocument()
  })

  it('Title translates the breadcrumb when the locale is English', () => {
    mockTranslations = { 'nav.posts': 'Posts' }
    render(<PostTitle>My Post</PostTitle>)
    expect(screen.getByRole('link', { name: 'Posts' })).toHaveAttribute(
      'href',
      '/posts'
    )
    expect(screen.queryByText('Publicaciones')).not.toBeInTheDocument()
  })

  it('PostImage renders an <img>', () => {
    render(<PostImage src="/p.png" alt="P" />)
    expect(screen.getByAltText('P')).toHaveAttribute('src', '/p.png')
  })

  it('Meta renders its label', () => {
    render(<PostMeta>Tags</PostMeta>)
    expect(screen.getByText('Tags')).toBeInTheDocument()
  })
})
