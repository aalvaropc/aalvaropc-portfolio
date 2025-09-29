import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button
} from '@chakra-ui/react'

const NotFound = () => {
  return (
    <Container>
      <Heading as="h1">Not found</Heading>
      <Text>Page was not found.</Text>
      <Divider my={6} />
      <Box my={6} align="center">
      </Box>
    </Container>
  )
}

export default NotFound