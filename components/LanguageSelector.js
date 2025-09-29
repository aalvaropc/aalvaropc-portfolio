import { Menu, MenuButton, MenuList, MenuItem, Button, Spinner, Box } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { useI18n } from '../lib/i18nContext'

const LanguageSelector = () => {
  const { locale, changeLocale, supportedLocales, isLoading } = useI18n()

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ]

  const currentLang = languages.find(lang => lang.code === locale) || languages[0]

  if (isLoading) {
    return (
      <Box display="flex" alignItems="center" px={2}>
        <Spinner size="sm" />
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
      <MenuList>
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
