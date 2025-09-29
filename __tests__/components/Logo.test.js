import { render, screen } from '@testing-library/react'
import Logo from '../../components/logo'

// Local mocks
jest.mock('next/link', () => {
  return function Link({ children, href, ...props }) {
    return <a href={href} {...props} data-testid="logo-link">{children}</a>
  }
})

jest.mock('next/image', () => {
  return function Image({ src, alt, width, height, ...props }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} width={width} height={height} {...props} data-testid="logo-image" />
  }
})

jest.mock('@chakra-ui/react', () => {
  // Helper function to filter props
  const filterDOMProps = (props) => {
    const allowedProps = ['className', 'style', 'id', 'role', 'aria-label', 'data-testid', 'onClick', 'href', 'target', 'rel', 'disabled']
    const domProps = {}
    Object.keys(props).forEach(key => {
      if (allowedProps.includes(key) || key.startsWith('data-') || key.startsWith('aria-')) {
        domProps[key] = props[key]
      }
    })
    return domProps
  }

  return {
    Text: ({ children, ...allProps }) => {
      const domProps = filterDOMProps(allProps)
      return <p data-testid="logo-text" {...domProps}>{children}</p>
    },
    useColorModeValue: (lightValue, _darkValue) => lightValue
  }
})

describe('Logo', () => {
  it('renders logo component', () => {
    render(<Logo />)
    
    const logoText = screen.getByText('Alvaro Peña')
    expect(logoText).toBeInTheDocument()
  })

  it('renders with correct styling', () => {
    render(<Logo />)
    
    const logoContainer = screen.getByText('Alvaro Peña').closest('span')
    expect(logoContainer).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<Logo />)
    
    const logoText = screen.getByText('Alvaro Peña')
    expect(logoText.tagName).toBe('P')
  })

  it('renders logo image', () => {
    render(<Logo />)
    
    const logoImage = screen.getByTestId('logo-image')
    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveAttribute('alt', 'logo')
  })

  it('renders as link to home', () => {
    render(<Logo />)
    
    const logoLink = screen.getByTestId('logo-link')
    expect(logoLink).toHaveAttribute('href', '/')
  })
})