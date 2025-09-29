import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import Footer from '../../components/Footer'

// Mock the theme
const mockTheme = {}

const renderWithChakra = (component) => {
  return render(
    <ChakraProvider theme={mockTheme}>
      {component}
    </ChakraProvider>
  )
}

describe('Footer', () => {
  it('renders footer component', () => {
    renderWithChakra(<Footer />)
    
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('displays current year in copyright', () => {
    renderWithChakra(<Footer />)
    
    const currentYear = new Date().getFullYear()
    const copyrightText = screen.getByText(new RegExp(`© ${currentYear} Alvaro Peña`))
    expect(copyrightText).toBeInTheDocument()
  })

  it('contains GitHub link', () => {
    renderWithChakra(<Footer />)
    
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toBeInTheDocument()
    expect(githubLink).toHaveAttribute('href', 'https://github.com/aalvaropc')
  })

  it('contains LinkedIn link', () => {
    renderWithChakra(<Footer />)
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toBeInTheDocument()
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/alvaro-pena-carrera')
  })

  it('contains Twitter link', () => {
    renderWithChakra(<Footer />)
    
    const twitterLink = screen.getByRole('link', { name: /twitter/i })
    expect(twitterLink).toBeInTheDocument()
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/aalvaropc')
  })

  it('contains Email link', () => {
    renderWithChakra(<Footer />)
    
    const emailLink = screen.getByRole('link', { name: /email/i })
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', 'mailto:alvaro@example.com')
  })

  it('has proper accessibility attributes', () => {
    renderWithChakra(<Footer />)
    
    const socialLinks = screen.getAllByRole('link')
    socialLinks.forEach(link => {
      expect(link).toHaveAttribute('href')
    })
  })
})