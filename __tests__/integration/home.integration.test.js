/**
 * Integration Tests
 * These tests verify that different parts of the application work together correctly
 */
import { screen } from '@testing-library/react'
import Home from '../../pages/index'
import { renderWithChakra } from '../utils/test-utils'

describe('Home Page Integration', () => {
  it('renders complete home page with all sections', () => {
    renderWithChakra(<Home />)
    
    // Hero section
    expect(screen.getByText(/backend-focused full stack developer/i)).toBeInTheDocument()
    
    // About section
    expect(screen.getByRole('heading', { name: /sobre mí/i })).toBeInTheDocument()
    expect(screen.getByText(/go, python y java/i)).toBeInTheDocument()
    
    // Experience section
    expect(screen.getByRole('heading', { name: /experiencia/i })).toBeInTheDocument()
    expect(screen.getByText(/guinea mobile/i)).toBeInTheDocument()
    
    // Stack section
    expect(screen.getByRole('heading', { name: /stack/i })).toBeInTheDocument()
    expect(screen.getByText(/fastapi.*spring boot/i)).toBeInTheDocument()
    
    // Contact section
    expect(screen.getByRole('heading', { name: /contacto/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
  })

  it('has proper navigation flow', () => {
    renderWithChakra(<Home />)
    
    // Main CTA should link to works
    const projectsLink = screen.getByRole('link', { name: /ver proyectos/i })
    expect(projectsLink).toHaveAttribute('href', '/works')
    
    // Contact links should have proper hrefs
    const githubLink = screen.getByRole('link', { name: /github/i })
    expect(githubLink).toHaveAttribute('href', 'https://github.com/aalvaropc')
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i })
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/aalvarop-pe/')
    
    const emailLink = screen.getByRole('link', { name: /email/i })
    expect(emailLink).toHaveAttribute('href', 'mailto:aalvaropc@gmail.com')
  })

  it('maintains proper semantic HTML structure', () => {
    renderWithChakra(<Home />)
    
    // Should have main heading
    const mainHeading = screen.getByRole('heading', { level: 2, name: /Alvaro peña/i })
    expect(mainHeading).toBeInTheDocument()
    
    // Should have section headings
    const sectionHeadings = screen.getAllByRole('heading', { level: 3 })
    expect(sectionHeadings.length).toBeGreaterThan(3)
    
    // Should have proper list structure for contact
    const contactList = screen.getByRole('list')
    expect(contactList).toBeInTheDocument()
  })

  it('displays professional information accurately', () => {
    renderWithChakra(<Home />)
    
    // Professional title
    expect(screen.getByText(/backend developer.*guinea mobile/i)).toBeInTheDocument()
    
    // Experience timeline
    expect(screen.getByText(/2025 febrero - presente/i)).toBeInTheDocument()
    expect(screen.getByText(/2024 febrero - 2025 febrero/i)).toBeInTheDocument()
    expect(screen.getByText(/2023 octubre - 2024 enero/i)).toBeInTheDocument()
    
    // Technology stack
    expect(screen.getByText(/go.*python.*java.*fastapi.*spring boot/i)).toBeInTheDocument()
    
    // Google Developer Group mention
    expect(screen.getByText(/google developer group ica/i)).toBeInTheDocument()
  })
})