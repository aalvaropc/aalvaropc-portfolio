import { Box, Text, HStack, Link, Icon } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = ({ router }) => {
  const isHomePage = router?.asPath === '/' || router?.asPath === ''
  
  return (
    <Box as="footer" py={12} textAlign="center">
      {/* Enlaces sociales minimalistas - Solo mostrar si NO es la página home */}
      {!isHomePage && (
        <HStack spacing={6} justify="center" mb={6}>
          <Link 
            href="https://github.com/aalvaropc" 
            isExternal
            _hover={{ color: 'teal.500', transform: 'translateY(-2px)' }}
            transition="all 0.2s ease"
          >
            <Icon as={FaGithub} boxSize={5} />
          </Link>
          <Link 
            href="https://linkedin.com/in/alvaro-pena-carrera" 
            isExternal
            _hover={{ color: 'teal.500', transform: 'translateY(-2px)' }}
            transition="all 0.2s ease"
          >
            <Icon as={FaLinkedin} boxSize={5} />
          </Link>
          <Link 
            href="mailto:alvaro@example.com" 
            _hover={{ color: 'teal.500', transform: 'translateY(-2px)' }}
            transition="all 0.2s ease"
          >
            <Icon as={FaEnvelope} boxSize={5} />
          </Link>
        </HStack>
      )}

      {/* Copyright simple */}
      <Text fontSize="sm" opacity={0.6}>
        &copy; {new Date().getFullYear()} Alvaro Peña
      </Text>
    </Box>
  )
}

export default Footer