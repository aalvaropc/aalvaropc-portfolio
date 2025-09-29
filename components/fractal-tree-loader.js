import { Box, Spinner, Center } from '@chakra-ui/react'

const FractalTreeLoader = () => {
  return (
    <Center height="45vh">
      <Box
        w={400}
        h={300}
        position="relative"
        borderRadius="lg"
        bg="transparent"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner
          size="xl"
          color="teal.500"
          thickness="4px"
        />
      </Box>
    </Center>
  )
}

export default FractalTreeLoader