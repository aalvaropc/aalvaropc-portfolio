import { render, screen } from '@testing-library/react'
import React from 'react'
import {
  GridItem,
  WorkGridItem,
  PostGridItem
} from '../../components/grid-items'

describe('Grid items', () => {
  it('WorkGridItem renders title, description and links to the work detail', () => {
    render(
      <WorkGridItem id="rmap" title="Rmap" thumbnail="/rmap.png">
        Recycling app
      </WorkGridItem>
    )
    expect(screen.getByText('Rmap')).toBeInTheDocument()
    expect(screen.getByText('Recycling app')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/works/rmap')
    expect(screen.getByAltText('Proyecto: Rmap')).toBeInTheDocument()
  })

  it('PostGridItem links to the post detail', () => {
    render(
      <PostGridItem id="edge" title="Edge" thumbnail="/edge.png">
        A post
      </PostGridItem>
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/posts/edge')
    expect(screen.getByAltText('Publicación: Edge')).toBeInTheDocument()
  })

  it('GridItem renders an external link opening in a new tab', () => {
    render(
      <GridItem href="https://example.com" title="Ext" thumbnail="/ext.png">
        desc
      </GridItem>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })
})
