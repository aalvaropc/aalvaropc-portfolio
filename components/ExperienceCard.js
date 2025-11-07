import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  useColorModeValue
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { FiBriefcase, FiCalendar } from 'react-icons/fi'
import { useI18n } from '../lib/i18nContext'

const MotionBox = motion(Box)

const ExperienceCard = ({
  period,
  position,
  company,
  isActive = false,
  delay = 0
}) => {
  const { t } = useI18n()
  const cardBg = useColorModeValue('white', 'whiteAlpha.100')
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200')
  const periodColor = useColorModeValue('gray.600', 'gray.400')
  const positionColor = useColorModeValue('gray.800', 'white')
  const companyColor = useColorModeValue('teal.600', 'teal.300')
  const activeAccent = useColorModeValue('teal.500', 'teal.300')
  const dotColor = useColorModeValue('gray.400', 'gray.500')
  const hoverBorderColor = useColorModeValue('gray.300', 'whiteAlpha.400')
  const activeDotShadow = useColorModeValue(
    'rgba(56, 178, 172, 0.1)',
    'rgba(129, 230, 217, 0.1)'
  )

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      position="relative"
      pl={{ base: 6, md: 8 }}
      pb={{ base: 4, md: 6 }}
      _before={{
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '2px',
        bg: useColorModeValue('gray.200', 'whiteAlpha.300'),
        display: { base: 'none', md: 'block' }
      }}
      _after={{
        content: '""',
        position: 'absolute',
        left: { base: '-2px', md: '-4px' },
        top: { base: '4px', md: '6px' },
        width: { base: '8px', md: '10px' },
        height: { base: '8px', md: '10px' },
        borderRadius: 'full',
        bg: isActive ? activeAccent : dotColor,
        border: '2px solid',
        borderColor: useColorModeValue('white', 'gray.800'),
        display: { base: 'none', md: 'block' },
        boxShadow: isActive ? `0 0 0 4px ${activeDotShadow}` : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <Box
        p={{ base: 3, md: 4 }}
        bg={cardBg}
        borderRadius="lg"
        border="1px solid"
        borderColor={borderColor}
        transition="all 0.3s ease"
        cursor="default"
        _hover={{
          transform: 'translateY(-1px)',
          shadow: useColorModeValue('lg', 'dark-lg'),
          borderColor: isActive ? activeAccent : hoverBorderColor
        }}
      >
        <VStack align="stretch" spacing={3}>
          {/* Header con período e icono */}
          <HStack justify="space-between" align="flex-start">
            <HStack spacing={2}>
              <Box color={periodColor}>
                <FiCalendar size={14} />
              </Box>
              <Text fontSize="sm" color={periodColor} fontWeight="medium">
                {period}
              </Text>
            </HStack>
            {isActive && (
              <Badge
                colorScheme="teal"
                variant="subtle"
                fontSize="xs"
                px={2}
                py={1}
                borderRadius="full"
              >
                {t('experience.current', 'Actual')}
              </Badge>
            )}
          </HStack>

          {/* Posición y empresa en la misma línea */}
          <HStack spacing={{ base: 2, md: 3 }} align="center" wrap="wrap">
            <Box color={companyColor} flexShrink={0}>
              <FiBriefcase size={16} />
            </Box>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight="bold"
              color={positionColor}
              lineHeight={1.2}
              noOfLines={1}
            >
              {position}
            </Text>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color={periodColor}
              fontWeight="normal"
              display={{ base: 'none', sm: 'block' }}
            >
              •
            </Text>
            <Text
              fontSize={{ base: 'sm', md: 'md' }}
              color={companyColor}
              fontWeight="semibold"
              noOfLines={1}
            >
              {company}
            </Text>
          </HStack>
        </VStack>
      </Box>
    </MotionBox>
  )
}

export default ExperienceCard
