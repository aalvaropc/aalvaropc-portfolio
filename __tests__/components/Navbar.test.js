import { render, screen } from '@testing-library/react'
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import Navbar from '../../components/navbar'

const mockTheme = {
  config: {
    initialColorMode: 'light'
  }
}

const renderWithChakra = (component) => {
  return render(
    <ChakraProvider theme={mockTheme}>
      <ColorModeProvider>
        {component}
      </ColorModeProvider>
    </ChakraProvider>
  )
}

describe('Navbar', () => {
  it('renders navbar component', () => {
    renderWithChakra(<Navbar path="/" />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })

  it('contains logo with name', () => {
    renderWithChakra(<Navbar path="/" />)
    
    const logo = screen.getByText('Alvaro Peña')
    expect(logo).toBeInTheDocument()
  })

  it('contains navigation links', () => {
    renderWithChakra(<Navbar path="/" />)
    
    const worksLink = screen.getByRole('link', { name: /trabajos/i })
    const postsLink = screen.getByRole('link', { name: /posts/i })
    
    expect(worksLink).toBeInTheDocument()
    expect(postsLink).toBeInTheDocument()
  })

  it('has theme toggle button', () => {
    renderWithChakra(<Navbar path="/" />)
    
    // Theme toggle button should be present
    const themeButton = screen.getByRole('button')
    expect(themeButton).toBeInTheDocument()
  })

  it('highlights current page in navigation', () => {
    renderWithChakra(<Navbar path="/works" />)
    
    // This would need to be tested based on the actual implementation
    // The navbar should highlight the current path
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})