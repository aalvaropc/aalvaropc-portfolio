import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import Posts from '../../pages/posts'

const mockTheme = {
  config: {
    initialColorMode: 'light'
  }
}

const renderWithChakra = (component) => {
  return render(
    <ChakraProvider theme={mockTheme}>
      {component}
    </ChakraProvider>
  )
}

describe('Posts Page', () => {
  it('renders page heading', () => {
    renderWithChakra(<Posts />)
    
    const heading = screen.getByRole('heading', { name: /posts/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays blog posts', () => {
    renderWithChakra(<Posts />)
    
    // Check for expected post titles based on your actual posts
    expect(screen.getByText(/grupo de estudio de estadística/i)).toBeInTheDocument()
    expect(screen.getByText(/arquitectura basada en eventos/i)).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    renderWithChakra(<Posts />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('contains post links', () => {
    renderWithChakra(<Posts />)
    
    const postLinks = screen.getAllByRole('link')
    expect(postLinks.length).toBeGreaterThan(0)
  })
})