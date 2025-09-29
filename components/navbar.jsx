
import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import LanguageSelector from './LanguageSelector'
import { useI18n } from '../lib/i18nContext'

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  const hoverBg = useColorModeValue('gray.100', 'whiteAlpha.200')
  
  return (
    <Link
      as={NextLink}
      href={href}
      px={3}
      py={2}
      borderRadius="md"
      bg={active ? 'grassTeal' : undefined}
      color={active ? '#202023' : inactiveColor}
      target={target}
      textDecoration="none"
      transition="all 0.2s ease-in-out"
      _hover={{
        bg: active ? 'grassTeal' : hoverBg,
        textDecoration: 'none',
        transform: 'translateY(-1px)',
      }}
      _focus={{
        boxShadow: '0 0 0 3px rgba(136, 204, 202, 0.3)',
      }}
      aria-current={active ? 'page' : undefined}
      {...props}
    >
      {children}
    </Link>
  )
}

const Navbar = props => {
  const { path } = props
  const { t } = useI18n()

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/works" path={path}>
            {t('nav.projects', 'Proyectos')}
          </LinkItem>
          <LinkItem href="/posts" path={path}>
            {t('nav.posts', 'Publicaciones')}
          </LinkItem>
          <LinkItem href="https://acortar.link/lunblB" target="_blank">
            {t('nav.cv', 'Curriculum vitae')}
          </LinkItem>
          <LinkItem href="https://acortar.link/lunblB">
            {t('nav.certificates', 'Certificados')}
          </LinkItem>
        </Stack>
        <Flex align="center" gap={2}>
          <Box display={{ base: 'none', md: 'block' }}>
            <LanguageSelector />
          </Box>
          <ThemeToggleButton />

          <Box display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem>
                  <Link as={NextLink} href="/" w="100%">
                    {t('nav.home', 'Información')}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link as={NextLink} href="/works" w="100%">
                    {t('nav.projects', 'Proyectos')}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link as={NextLink} href="/posts" w="100%">
                    {t('nav.posts', 'Publicaciones')}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="https://acortar.link/lunblB" target="_blank" w="100%">
                    {t('nav.cv', 'CV')}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link href="https://acortar.link/lunblB" w="100%">
                    {t('nav.certificates', 'Certificados')}
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Box w="100%">
                    <LanguageSelector />
                  </Box>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default Navbar
