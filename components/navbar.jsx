
import React from 'react'
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

const NavbarComponent = ({ path, ...props }) => {
  const { t } = useI18n()

  return (
    <Box
      position="fixed"
      as="nav"
      w="100vw"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      left={0}
      right={0}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="nowrap"
        align="center"
        justify="space-between"
        mx="auto"
      >
        <Flex align="center" mr={{ base: 2, md: 5 }} flex="0 0 auto">
          <Heading as="h1" size={{ base: 'md', md: 'lg' }} letterSpacing={'tighter'}>
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
          spacing={{ base: 2, md: 4 }}
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
        
        <Flex align="center" gap={{ base: 1, md: 2 }} flex="0 0 auto">
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
                aria-label="Menu"
                size="md"
                w="40px"
                h="40px"
                minW="40px"
              />
              <MenuList
                maxW="250px"
                w="max-content"
                zIndex={3}
                boxShadow="2xl"
                borderRadius="md"
                border="1px solid"
                borderColor={useColorModeValue('gray.200', 'gray.600')}
              >
                <MenuItem
                  as={Link}
                  href="/"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                >
                  {t('nav.home', 'Información')}
                </MenuItem>
                <MenuItem
                  as={Link}
                  href="/works"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                >
                  {t('nav.projects', 'Proyectos')}
                </MenuItem>
                <MenuItem
                  as={Link}
                  href="/posts"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                >
                  {t('nav.posts', 'Publicaciones')}
                </MenuItem>
                <MenuItem
                  as={Link}
                  href="https://acortar.link/lunblB"
                  target="_blank"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                >
                  {t('nav.cv', 'CV')}
                </MenuItem>
                <MenuItem
                  as={Link}
                  href="https://acortar.link/lunblB"
                  display="flex"
                  alignItems="center"
                  _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                >
                  {t('nav.certificates', 'Certificados')}
                </MenuItem>
                <MenuItem
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={useColorModeValue('gray.50', 'gray.800')}
                  _hover={{ bg: useColorModeValue('gray.50', 'gray.800') }}
                  closeOnSelect={false}
                  py={4}
                  borderTop="1px solid"
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                  mt={1}
                >
                  <LanguageSelector isMobile={true} />
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

NavbarComponent.displayName = 'Navbar';

const Navbar = React.memo(NavbarComponent);

export default Navbar
