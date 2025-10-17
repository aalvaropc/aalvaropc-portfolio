import { 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Button, 
  Spinner, 
  Box,
  useColorModeValue
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useI18n } from '../lib/i18nContext'
import { useTranslations } from '../lib/useTranslations'

const LanguageSelector = ({ isMobile = false }) => {
  const { locale, changeLocale, supportedLocales, isLoading } = useI18n()
  const { t } = useTranslations(locale, 'common')

  const languages = [
    { code: 'es', name: t('languages.spanish', 'Español'), flag: '🇪🇸', shortName: 'ES' },
    { code: 'en', name: t('languages.english', 'English'), flag: '🇺🇸', shortName: 'EN' }
  ]

  const currentLang = languages.find(lang => lang.code === locale) || languages[0]

  // Colores para el tema - definir todos aquí para evitar hooks condicionales
  const toggleBg = useColorModeValue('gray.200', 'gray.600')
  const toggleBorder = useColorModeValue('gray.300', 'gray.500')
  const activeBg = useColorModeValue('white', 'gray.800')
  const activeColor = useColorModeValue('gray.800', 'white')
  const inactiveColor = useColorModeValue('gray.600', 'gray.300')
  const hoverBg = useColorModeValue('gray.100', 'gray.700')

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" px={2}>
        <Spinner size="sm" />
      </Box>
    )
  }

  // Para menú móvil, usamos un toggle compacto y elegante
  if (isMobile) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="100%"
        py={2}
      >
        <Box
          display="flex"
          bg={toggleBg}
          borderRadius="full"
          p="2px"
          border="1px solid"
          borderColor={toggleBorder}
          boxShadow="sm"
        >
          {languages
            .filter(language => supportedLocales.includes(language.code))
            .map((language) => {
              const isActive = locale === language.code
              return (
                <Button
                  key={language.code}
                  onClick={() => changeLocale(language.code)}
                  size="sm"
                  minW="45px"
                  h="30px"
                  bg={isActive ? activeBg : 'transparent'}
                  color={isActive ? activeColor : inactiveColor}
                  border="none"
                  borderRadius="full"
                  fontWeight={isActive ? 'bold' : 'medium'}
                  fontSize="xs"
                  boxShadow={isActive ? 'sm' : 'none'}
                  _hover={{
                    bg: isActive ? activeBg : hoverBg,
                  }}
                  _active={{
                    transform: 'scale(0.98)',
                  }}
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  {language.shortName}
                </Button>
              )
            })}
        </Box>
      </Box>
    )
  }

  return (
    <Menu>
      <MenuButton 
        as={Button} 
        rightIcon={<ChevronDownIcon />} 
        size="sm" 
        variant="ghost"
        minW="auto"
        px={2}
        _hover={{
          bg: 'gray.100',
          _dark: {
            bg: 'gray.700'
          }
        }}
      >
        {currentLang.flag}
      </MenuButton>
      <MenuList zIndex={4}>
        {languages
          .filter(language => supportedLocales.includes(language.code))
          .map((language) => (
            <MenuItem
              key={language.code}
              onClick={() => changeLocale(language.code)}
              bg={locale === language.code ? 'gray.100' : 'transparent'}
              _dark={{
                bg: locale === language.code ? 'gray.700' : 'transparent'
              }}
              _hover={{
                bg: 'gray.200',
                _dark: {
                  bg: 'gray.600'
                }
              }}
            >
              {language.flag} {language.name}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  )
}

export default LanguageSelector
