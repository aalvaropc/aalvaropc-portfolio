import { Box, Spinner, VStack, Text } from '@chakra-ui/react'

const LoadingScreen = ({ message = 'Cargando...' }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bg="gray.50"
      _dark={{ bg: 'gray.900' }}
    >
      <VStack spacing={4}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
        <Text color="gray.600" _dark={{ color: 'gray.400' }}>
          {message}
        </Text>
      </VStack>
    </Box>
  )
}

export default LoadingScreen