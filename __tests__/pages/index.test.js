import { render, screen } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import Home from '../../pages/index'

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

describe('Home Page', () => {
  it('renders main heading', () => {
    renderWithChakra(<Home />)
    
    const heading = screen.getByRole('heading', { name: /Alvaro peña/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays professional title', () => {
    renderWithChakra(<Home />)
    
    const title = screen.getByText(/backend-focused full stack developer/i)
    expect(title).toBeInTheDocument()
  })

  it('shows about section', () => {
    renderWithChakra(<Home />)
    
    const aboutHeading = screen.getByRole('heading', { name: /sobre mí/i })
    expect(aboutHeading).toBeInTheDocument()
  })

  it('displays technology stack', () => {
    renderWithChakra(<Home />)
    
    const stackHeading = screen.getByRole('heading', { name: /stack/i })
    expect(stackHeading).toBeInTheDocument()
    
    const technologies = screen.getByText(/go.*python.*java/i)
    expect(technologies).toBeInTheDocument()
  })

  it('shows experience section', () => {
    renderWithChakra(<Home />)
    
    const experienceHeading = screen.getByRole('heading', { name: /experiencia/i })
    expect(experienceHeading).toBeInTheDocument()
  })

  it('displays contact information', () => {
    renderWithChakra(<Home />)
    
    const contactHeading = screen.getByRole('heading', { name: /contacto/i })
    expect(contactHeading).toBeInTheDocument()
  })

  it('has link to projects', () => {
    renderWithChakra(<Home />)
    
    const projectsLink = screen.getByRole('link', { name: /ver proyectos/i })
    expect(projectsLink).toBeInTheDocument()
    expect(projectsLink).toHaveAttribute('href', '/works')
  })

  it('shows professional experience timeline', () => {
    renderWithChakra(<Home />)
    
    expect(screen.getByText(/guinea mobile/i)).toBeInTheDocument()
    expect(screen.getByText(/ntt data/i)).toBeInTheDocument()
    expect(screen.getByText(/proveedy/i)).toBeInTheDocument()
  })

  it('displays interests section', () => {
    renderWithChakra(<Home />)
    
    const interestsHeading = screen.getByRole('heading', { name: /intereses/i })
    expect(interestsHeading).toBeInTheDocument()
    
    const interests = screen.getByText(/arquitecturas escalables.*sistemas distribuidos/i)
    expect(interests).toBeInTheDocument()
  })
})