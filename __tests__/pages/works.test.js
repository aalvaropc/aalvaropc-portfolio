import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import Works from '../../pages/works'

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

describe('Works Page', () => {
  it('renders page heading', () => {
    renderWithChakra(<Works />)
    
    const heading = screen.getByRole('heading', { name: /trabajos/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays project grid items', () => {
    renderWithChakra(<Works />)
    
    // Check for some expected project names based on your actual projects
    expect(screen.getByText(/user behavior pipeline/i)).toBeInTheDocument()
    expect(screen.getByText(/farmaluren/i)).toBeInTheDocument()
    expect(screen.getByText(/rmap/i)).toBeInTheDocument()
  })

  it('has proper page structure', () => {
    renderWithChakra(<Works />)
    
    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
  })

  it('contains project links', () => {
    renderWithChakra(<Works />)
    
    const projectLinks = screen.getAllByRole('link')
    expect(projectLinks.length).toBeGreaterThan(0)
  })
})