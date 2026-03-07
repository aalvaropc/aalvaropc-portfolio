import { useState } from 'react'
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
  Alert,
  AlertIcon,
  useColorModeValue
} from '@chakra-ui/react'
import { useI18n } from '../lib/i18nContext'

const ContactForm = () => {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const counterColor = useColorModeValue('gray.500', 'gray.400')

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [honeypot, setHoneypot] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()

    if (!formData.message.trim()) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
          _honeypot: honeypot
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitStatus('success')
      setFormData({ email: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
      p={8}
      borderRadius="lg"
      border="1px solid"
      borderColor={useColorModeValue('gray.200', 'gray.600')}
      maxW="md"
      mx="auto"
      css={{ backdropFilter: 'blur(10px)' }}
    >
      <VStack spacing={6}>
        {/* Honeypot field - hidden from users, bots will fill it */}
        <input
          type="text"
          name="_honeypot"
          value={honeypot}
          onChange={e => setHoneypot(e.target.value)}
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <FormControl>
          <FormLabel
            fontSize="sm"
            fontWeight="medium"
            color={useColorModeValue('gray.700', 'gray.300')}
            mb={2}
          >
            {t('contactForm.email.label', 'Email')}
            <Text
              as="span"
              fontSize="xs"
              opacity={0.8}
              ml={2}
              fontWeight="normal"
            >
              ({t('contactForm.email.optional', 'opcional')})
            </Text>
          </FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('contactForm.email.placeholder', 'tu@email.com')}
            maxLength={254}
            size="md"
            borderRadius="md"
            bg="transparent"
            border="1px solid"
            borderColor={useColorModeValue('gray.300', 'gray.600')}
            _hover={{
              borderColor: useColorModeValue('teal.400', 'teal.300')
            }}
            _focus={{
              borderColor: 'teal.400',
              boxShadow: 'none',
              outline: 'none'
            }}
            _placeholder={{
              color: useColorModeValue('gray.400', 'gray.500')
            }}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel
            fontSize="sm"
            fontWeight="medium"
            color={useColorModeValue('gray.700', 'gray.300')}
            mb={2}
          >
            {t('contactForm.message.label', 'Mensaje')}
          </FormLabel>
          <Textarea
            name="message"
            value={formData.message}
            onChange={e => {
              if (e.target.value.length <= 500) {
                handleInputChange(e)
              }
            }}
            placeholder={t(
              'contactForm.message.placeholder',
              'Cuéntame sobre tu proyecto o idea...'
            )}
            rows={4}
            resize="vertical"
            borderRadius="md"
            maxLength={500}
            bg="transparent"
            border="1px solid"
            borderColor={useColorModeValue('gray.300', 'gray.600')}
            _hover={{
              borderColor: useColorModeValue('teal.400', 'teal.300')
            }}
            _focus={{
              borderColor: 'teal.400',
              boxShadow: 'none',
              outline: 'none'
            }}
            _placeholder={{
              color: useColorModeValue('gray.400', 'gray.500')
            }}
          />
          <Text
            fontSize="xs"
            color={formData.message.length > 450 ? 'orange.400' : counterColor}
            textAlign="right"
            mt={1}
            fontWeight={formData.message.length > 450 ? 'medium' : 'normal'}
          >
            {formData.message.length}/500
          </Text>
        </FormControl>

        {submitStatus === 'success' && (
          <Alert
            status="success"
            borderRadius="md"
            fontSize="sm"
            variant="left-accent"
          >
            <AlertIcon />
            {t(
              'contactForm.success',
              '¡Mensaje enviado! Te responderé pronto.'
            )}
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert
            status="error"
            borderRadius="md"
            fontSize="sm"
            variant="left-accent"
          >
            <AlertIcon />
            {t(
              'contactForm.error',
              'Error al enviar. Por favor, intenta de nuevo.'
            )}
          </Alert>
        )}

        <Button
          type="submit"
          colorScheme="teal"
          size="md"
          width="full"
          isLoading={isSubmitting}
          loadingText={t('contactForm.sending', 'Enviando...')}
          disabled={!formData.message.trim()}
          borderRadius="md"
          fontWeight="medium"
          variant="outline"
        >
          {t('contactForm.submit', 'Enviar Mensaje')}
        </Button>
      </VStack>
    </Box>
  )
}

export default ContactForm
