import NextLink from 'next/link'
import Image from 'next/image'
import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { Global } from '@emotion/react'

export const GridItem = ({ children, href, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer" role="group">
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="lg"
        transition="transform 0.2s ease-in-out"
        _groupHover={{ transform: 'scale(1.02)' }}
      >
        <Image
          src={thumbnail}
          alt={title}
          className="grid-item-thumbnail"
          placeholder="blur"
          loading="lazy"
          width={600}
          height={400}
          quality={85}
          style={{
            width: '100%',
            height: 'auto'
          }}
        />
      </Box>
      <LinkOverlay href={href} target="_blank" rel="noopener noreferrer">
        <Text
          mt={2}
          fontSize="lg"
          fontWeight="medium"
          _groupHover={{ color: 'teal.500' }}
        >
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }}>
        {children}
      </Text>
    </LinkBox>
  </Box>
)

export const WorkGridItem = ({ children, id, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer" role="group">
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="lg"
        transition="all 0.2s ease-in-out"
        _groupHover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      >
        <Image
          src={thumbnail}
          alt={`Proyecto: ${title}`}
          className="grid-item-thumbnail"
          placeholder="blur"
          loading="lazy"
          width={600}
          height={400}
          quality={85}
          style={{
            width: '100%',
            height: 'auto'
          }}
        />
      </Box>
      <LinkOverlay as={NextLink} href={`/works/${id}`}>
        <Text
          mt={3}
          fontSize="xl"
          fontWeight="semibold"
          _groupHover={{ color: 'teal.500' }}
          transition="color 0.2s ease-in-out"
        >
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }} mt={1}>
        {children}
      </Text>
    </LinkBox>
  </Box>
)

export const PostGridItem = ({ children, id, title, thumbnail }) => (
  <Box w="100%" textAlign="center">
    <LinkBox cursor="pointer" role="group">
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="lg"
        transition="all 0.2s ease-in-out"
        _groupHover={{ transform: 'translateY(-4px)', shadow: 'lg' }}
      >
        <Image
          src={thumbnail}
          alt={`Publicación: ${title}`}
          className="grid-item-thumbnail"
          placeholder="blur"
          loading="lazy"
          width={600}
          height={400}
          quality={85}
          style={{
            width: '100%',
            height: 'auto'
          }}
        />
      </Box>
      <LinkOverlay as={NextLink} href={`/posts/${id}`}>
        <Text
          mt={3}
          fontSize="xl"
          fontWeight="semibold"
          _groupHover={{ color: 'teal.500' }}
          transition="color 0.2s ease-in-out"
        >
          {title}
        </Text>
      </LinkOverlay>
      <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400' }} mt={1}>
        {children}
      </Text>
    </LinkBox>
  </Box>
)

export const GridItemStyle = () => (
  <Global
    styles={`
      .grid-item-thumbnail {
        border-radius: 12px;
        transition: all 0.3s ease-in-out;
      }
      
      .card-effect {
        height: 600px;
        width: 700px;
        transition: all 0.3s ease-in-out;
        background: url(https://bit.ly/3ZbNdfW) no-repeat center;
        background-size: cover;
        border-radius: 16px;
      }

      .card-effect:hover {
        box-shadow: 0px 20px 60px rgba(0,0,0,0.3);
        transform: translateY(-5px);
      }
      
      /* Smooth scroll behavior */
      html {
        scroll-behavior: smooth;
      }
      
      /* Focus styles for accessibility */
      *:focus {
        outline: 2px solid #88ccca;
        outline-offset: 2px;
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0,0,0,0.1);
      }
      
      ::-webkit-scrollbar-thumb {
        background: #88ccca;
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: #6bb6b4;
      }
      
      /* P5.js Canvas Styles */
      .fractal-tree-container canvas {
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
      }
      
      .fractal-tree-container canvas:hover {
        transform: scale(1.01);
      }
    `}
  />
)
