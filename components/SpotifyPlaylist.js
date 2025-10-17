import { Box, useColorModeValue } from '@chakra-ui/react'

const SpotifyPlaylist = ({
  playlistId = '5G2bvK8rLxILcvn9z18OL0',
  height = 152
}) => {
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const bgColor = useColorModeValue('gray.50', 'gray.800')

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      transition="all 0.2s ease"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'lg'
      }}
      maxW="100%"
    >
      <iframe
        data-testid="spotify-embed"
        style={{
          borderRadius: '12px',
          border: 'none',
          width: '100%',
          height: `${height}px`,
          display: 'block'
        }}
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
        width="100%"
        height={height}
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Playlist"
      />
    </Box>
  )
}

export default SpotifyPlaylist
