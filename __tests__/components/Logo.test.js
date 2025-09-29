import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import Logo from '../../components/logo'

const mockTheme = {}

const renderWithChakra = (component) => {
  return render(
    <ChakraProvider theme={mockTheme}>
      {component}
    </ChakraProvider>
  )
}

describe('Logo', () => {
  it('renders logo component', () => {
    renderWithChakra(<Logo />)
    
    const logoText = screen.getByText('Alvaro Peña')
    expect(logoText).toBeInTheDocument()
  })

  it('renders with correct styling', () => {
    renderWithChakra(<Logo />)
    
    const logoContainer = screen.getByText('Alvaro Peña').closest('div')
    expect(logoContainer).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    renderWithChakra(<Logo />)
    
    const logoText = screen.getByText('Alvaro Peña')
    expect(logoText.tagName).toBe('P')
  })
})