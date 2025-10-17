/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import SpotifyPlaylist from '../../components/SpotifyPlaylist'

// Mock ChakraUI components
jest.mock('@chakra-ui/react', () => {
  const filterDOMProps = props => {
    const allowedProps = [
      'className',
      'style',
      'id',
      'role',
      'aria-label',
      'data-testid',
      'onClick',
      'href',
      'target',
      'rel',
      'disabled'
    ]
    const domProps = {}
    Object.keys(props).forEach(key => {
      if (
        allowedProps.includes(key) ||
        key.startsWith('data-') ||
        key.startsWith('aria-')
      ) {
        domProps[key] = props[key]
      }
    })
    return domProps
  }

  return {
    useColorModeValue: () => 'gray.200',
    Box: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <div {...domProps}>{children}</div>
    }
  }
})

describe('SpotifyPlaylist', () => {
  it('renders spotify embed iframe', () => {
    render(<SpotifyPlaylist />)

    const iframe = screen.getByTestId('spotify-embed')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('src')
    expect(iframe.getAttribute('src')).toContain('spotify.com/embed/playlist')
  })

  it('uses default playlist ID when none provided', () => {
    render(<SpotifyPlaylist />)

    const iframe = screen.getByTestId('spotify-embed')
    expect(iframe.getAttribute('src')).toContain('5G2bvK8rLxILcvn9z18OL0')
  })

  it('uses custom playlist ID when provided', () => {
    const customPlaylistId = 'customPlaylistId123'
    render(<SpotifyPlaylist playlistId={customPlaylistId} />)

    const iframe = screen.getByTestId('spotify-embed')
    expect(iframe.getAttribute('src')).toContain(customPlaylistId)
  })

  it('uses custom height when provided', () => {
    const customHeight = 300
    render(<SpotifyPlaylist height={customHeight} />)

    const iframe = screen.getByTestId('spotify-embed')
    expect(iframe).toHaveAttribute('height', customHeight.toString())
  })

  it('has proper accessibility attributes', () => {
    render(<SpotifyPlaylist />)

    const iframe = screen.getByTestId('spotify-embed')
    expect(iframe).toHaveAttribute('title', 'Spotify Playlist')
    expect(iframe).toHaveAttribute('loading', 'lazy')
  })

  it('has proper security attributes', () => {
    render(<SpotifyPlaylist />)

    const iframe = screen.getByTestId('spotify-embed')
    expect(iframe).toHaveAttribute('frameBorder', '0')
    expect(iframe).toHaveAttribute('allowFullScreen')
    expect(iframe).toHaveAttribute('allow')
  })
})
