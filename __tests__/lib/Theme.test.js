// Mock Chakra UI
jest.mock('@chakra-ui/react', () => ({
  extendTheme: jest.fn((config) => config)
}))

jest.mock('@chakra-ui/theme-tools', () => ({
  mode: jest.fn((lightValue, darkValue) => (props) => {
    return props?.colorMode === 'dark' ? darkValue : lightValue
  })
}))

import theme from '../../lib/theme.js'

describe('Theme Configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('exports a theme object', () => {
    expect(theme).toBeDefined()
    expect(typeof theme).toBe('object')
  })

  it('has correct config properties', () => {
    expect(theme.config).toBeDefined()
    expect(theme.config.initialColorMode).toBe('dark')
    expect(theme.config.useSystemColorMode).toBe(true)
  })

  it('defines custom colors', () => {
    expect(theme.colors).toBeDefined()
    expect(theme.colors.grassTeal).toBe('#88ccca')
    expect(theme.colors.brand).toBeDefined()
    expect(theme.colors.brand[500]).toBe('#88ccca')
  })

  it('defines custom fonts', () => {
    expect(theme.fonts).toBeDefined()
    expect(theme.fonts.heading).toBe("'M PLUS Rounded 1c'")
  })

  it('has global styles', () => {
    expect(theme.styles).toBeDefined()
    expect(theme.styles.global).toBeDefined()
    expect(typeof theme.styles.global).toBe('function')
  })

  it('applies correct light mode styles', () => {
    const lightModeProps = { colorMode: 'light' }
    const globalStyles = theme.styles.global(lightModeProps)
    
    expect(globalStyles).toBeDefined()
    expect(globalStyles.body).toBeDefined()
  })

  it('applies correct dark mode styles', () => {
    const darkModeProps = { colorMode: 'dark' }
    const globalStyles = theme.styles.global(darkModeProps)
    
    expect(globalStyles).toBeDefined()
    expect(globalStyles.body).toBeDefined()
  })

  it('defines component variants', () => {
    expect(theme.components).toBeDefined()
    expect(theme.components.Heading).toBeDefined()
    expect(theme.components.Heading.variants).toBeDefined()
    expect(theme.components.Heading.variants['section-title']).toBeDefined()
  })

  it('has section-title variant properties', () => {
    const sectionTitle = theme.components.Heading.variants['section-title']
    
    expect(sectionTitle.textDecoration).toBe('underline')
    expect(sectionTitle.fontSize).toBe(20)
    expect(sectionTitle.textUnderlineOffset).toBe(6)
    expect(sectionTitle.textDecorationColor).toBe('#525252')
    expect(sectionTitle.textDecorationThickness).toBe(4)
    expect(sectionTitle.marginTop).toBe(3)
    expect(sectionTitle.marginBottom).toBe(4)
  })

  it('defines Link component styles', () => {
    expect(theme.components.Link).toBeDefined()
    expect(theme.components.Link.baseStyle).toBeDefined()
    expect(typeof theme.components.Link.baseStyle).toBe('function')
  })

  it('applies correct Link colors for light mode', () => {
    const lightProps = { colorMode: 'light' }
    const linkStyles = theme.components.Link.baseStyle(lightProps)
    
    expect(linkStyles).toBeDefined()
    expect(linkStyles.textUnderlineOffset).toBe(3)
  })

  it('applies correct Link colors for dark mode', () => {
    const darkProps = { colorMode: 'dark' }
    const linkStyles = theme.components.Link.baseStyle(darkProps)
    
    expect(linkStyles).toBeDefined()
    expect(linkStyles.textUnderlineOffset).toBe(3)
  })

  it('has all brand color variants', () => {
    const brandColors = theme.colors.brand
    const expectedShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    
    expectedShades.forEach(shade => {
      expect(brandColors[shade]).toBeDefined()
      expect(typeof brandColors[shade]).toBe('string')
      expect(brandColors[shade]).toMatch(/^#[0-9a-fA-F]{6}$/)
    })
  })

  it('theme structure is valid', () => {
    // Verify theme has all expected top-level properties
    expect(Object.keys(theme)).toEqual(
      expect.arrayContaining(['config', 'styles', 'components', 'fonts', 'colors'])
    )
  })

  it('brand colors have proper hex format', () => {
    const { brand } = theme.colors
    
    Object.values(brand).forEach(color => {
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/)
    })
  })
})