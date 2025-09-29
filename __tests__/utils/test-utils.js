import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import userEvent from '@testing-library/user-event'

// Test utilities
export const mockTheme = {
  config: {
    initialColorMode: 'light'
  }
}

export const renderWithChakra = (component) => {
  return render(
    <ChakraProvider theme={mockTheme}>
      {component}
    </ChakraProvider>
  )
}

export const renderWithProviders = (component, { theme = mockTheme } = {}) => {
  return {
    user: userEvent.setup(),
    ...render(
      <ChakraProvider theme={theme}>
        {component}
      </ChakraProvider>
    )
  }
}

// Custom matchers for common assertions
export const expectToBeVisible = (element) => {
  expect(element).toBeInTheDocument()
  expect(element).toBeVisible()
}

export const expectLinkToHaveHref = (linkText, expectedHref) => {
  const link = screen.getByRole('link', { name: new RegExp(linkText, 'i') })
  expect(link).toHaveAttribute('href', expectedHref)
}

// Mock data for tests
export const mockProjects = [
  {
    id: 'userBehaviorPipeline',
    title: 'User Behavior Pipeline',
    thumbnail: '/images/works/pipeline.png'
  },
  {
    id: 'farmaLuren',
    title: 'FarmaLuren',
    thumbnail: '/images/works/farmaLuren.png'
  }
]

export const mockPosts = [
  {
    id: 'GrupoEstadistica',
    title: 'Grupo de Estudio de Estadística',
    thumbnail: '/images/posts/estadistica/grupo-estadistica.png'
  },
  {
    id: 'ArqBasadaEventos',
    title: 'Arquitectura Basada en Eventos',
    thumbnail: '/images/posts/wlp/EdaWlp.png'
  }
]