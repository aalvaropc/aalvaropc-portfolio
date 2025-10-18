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
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
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

  const handleSubmit = async e => {
    e.preventDefault()

    if (!formData.message.trim()) {
      setSubmitStatus('error')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Crear fecha en zona horaria de Perú (UTC-5)
      const now = new Date()
      const peruTime = new Date(now.getTime() - 5 * 60 * 60 * 1000) // UTC-5
      const fechaEnvioLocal =
        peruTime.toISOString().replace('T', ' ').substring(0, 19) + ' (UTC-5)'

      const docData = {
        texto: formData.message.trim(),
        fechaEnvio: fechaEnvioLocal
      }

      // Solo agregar email si no está vacío
      if (formData.email && formData.email.trim()) {
        docData.email = formData.email.trim()
      }

      await addDoc(collection(db, 'mensajes'), docData)

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
              opacity={0.7}
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
