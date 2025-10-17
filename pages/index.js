import {
  Container,
  Box,
  Heading,
  useColorModeValue,
  Link,
  Button,
  List,
  ListItem
} from '@chakra-ui/react'
import Paragraph from '../components/paragraph'
import NextLink from 'next/link'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BioSection, BioYear } from '../components/bio'
import { IoLogoLinkedin, IoLogoGithub } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import SpotifyPlaylist from '../components/SpotifyPlaylist'
import { useI18n } from '../lib/i18nContext'

const Page = () => {
  const { t } = useI18n()

  return (
    <>
      <Layout>
        <Container mt={0}>
          <Box
            borderRadius="lg"
            mb={0}
            p={0}
            mt={0}
            pt={0}
            css={{ backdropFilter: 'blur(10px)' }}
          ></Box>
          <Box
            borderRadius="lg"
            mb={6}
            mt={0}
            p={6}
            textAlign="center"
            bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
            css={{ backdropFilter: 'blur(10px)' }}
            position="relative"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 'lg',
              padding: '1px',
              background: 'linear-gradient(45deg, #88ccca, #3d7aed, #ff63c3)',
              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              maskComposite: 'exclude',
              WebkitMaskComposite: 'xor'
            }}
          >
            <Box
              fontSize="lg"
              color={useColorModeValue('gray.700', 'gray.300')}
            >
              {t('hero.title', 'Backend-focused Full Stack Developer')}
            </Box>
            <Box fontSize="sm" mt={2} opacity={0.7}>
              {t(
                'hero.subtitle',
                'Diseñando arquitecturas escalables y sistemas distribuidos'
              )}
            </Box>
          </Box>

          <Box display={{ md: 'flex' }}>
            <Box flexGrow={1}>
              <Heading as="h2" variant="page-title" mb={2}>
                {t('common.name', 'Alvaro Peña')}
              </Heading>
              <Box
                fontSize="md"
                fontWeight="medium"
                color={useColorModeValue('gray.600', 'gray.400')}
              >
                Software Engineer
              </Box>
            </Box>
          </Box>

          <Section delay={0.1}>
            <Heading as="h3" variant="section-title">
              {t('about.title', 'Sobre mí')}
            </Heading>
            <Paragraph>
              {t(
                'about.description1',
                'Backend-focused Full Stack Developer especializado en diseñar arquitecturas escalables con Go, Python y Java. Experiencia construyendo servicios REST, sistemas en tiempo real y microservicios distribuidos.'
              )}
            </Paragraph>
            <Paragraph>
              {t(
                'about.description2',
                'Miembro del Google Developer Group Ica, contribuyendo al crecimiento de la comunidad tech local mediante eventos y mentoría.'
              )}
            </Paragraph>
            <Box align="center" my={8}>
              <Button
                as={NextLink}
                href="/works"
                rightIcon={<ChevronRightIcon />}
                colorScheme="teal"
                size="md"
                variant="outline"
              >
                {t('about.cta', t('nav.projects', 'Ver proyectos'))}
              </Button>
            </Box>
          </Section>

          <Section delay={0.2}>
            <Heading as="h3" variant="section-title">
              {t('experience.title', 'Experiencia')}
            </Heading>
            <BioSection>
              <BioYear>
                {t('experience.jobs.0.period', '2025 febrero - presente')}
              </BioYear>
              {t('experience.jobs.0.position', 'Backend Developer')}{' '}
              {t('prepositions.at', 'en')}{' '}
              {t('experience.jobs.0.company', 'Guinea Mobile')}
            </BioSection>
            <BioSection>
              <BioYear>
                {t('experience.jobs.1.period', '2024 febrero - 2025 febrero')}
              </BioYear>
              {t('experience.jobs.1.position', 'Centers Junior')}{' '}
              {t('prepositions.at', 'en')}{' '}
              {t('experience.jobs.1.company', 'NTT Data')}
            </BioSection>
            <BioSection>
              <BioYear>
                {t('experience.jobs.2.period', '2023 octubre - 2024 enero')}
              </BioYear>
              {t('experience.jobs.2.position', 'Full-Stack Junior')}{' '}
              {t('prepositions.at', 'en')}{' '}
              {t('experience.jobs.2.company', 'Proveedy')}
            </BioSection>
            <BioSection>
              <BioYear>
                {t('experience.jobs.3.period', '2023 julio - presente')}
              </BioYear>
              {t('experience.jobs.3.position', 'Miembro')}{' '}
              {t('prepositions.of', 'de')}{' '}
              {t('experience.jobs.3.company', 'Google Developer Group Ica')}
            </BioSection>
          </Section>

          <Section delay={0.3}>
            <Heading as="h3" variant="section-title">
              {t('skills.title', 'Stack')}
            </Heading>
            <Paragraph>
              {t(
                'skills.technologies',
                'Go • Python • Java • FastAPI • Spring Boot • PostgreSQL • Redis • Docker • GCP • AWS • RabbitMQ'
              )}
            </Paragraph>
          </Section>

          <Section delay={0.4}>
            <Heading as="h3" variant="section-title">
              {t('interests.title', 'Intereses')}
            </Heading>
            <Paragraph>
              {t(
                'interests.list',
                'Arquitecturas escalables • Sistemas distribuidos • Microservicios • Cloud Native'
              )}
            </Paragraph>
          </Section>

          <Section delay={0.5}>
            <Heading as="h3" variant="section-title">
              {t('music.title', 'Actualmente Escuchando')}
            </Heading>
            <Paragraph mb={4}>
              {t(
                'music.description',
                'Música que me acompaña mientras programo'
              )}
            </Paragraph>
            <SpotifyPlaylist />
          </Section>

          <Section delay={0.6}>
            <Heading as="h3" variant="section-title">
              {t('contact.title', 'Contacto')}
            </Heading>
            <List>
              <ListItem>
                <Link href="https://github.com/aalvaropc" target="_blank">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<IoLogoGithub />}
                  >
                    {t('contact.social.github.label', 'GitHub')}
                  </Button>
                </Link>
              </ListItem>

              <ListItem>
                <Link
                  href="https://www.linkedin.com/in/aalvarop-pe/"
                  target="_blank"
                >
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<IoLogoLinkedin />}
                  >
                    {t('contact.social.linkedin.label', 'LinkedIn')}
                  </Button>
                </Link>
              </ListItem>

              <ListItem>
                <Link href="mailto:aalvaropc@gmail.com">
                  <Button
                    variant="ghost"
                    colorScheme="teal"
                    leftIcon={<MdEmail />}
                  >
                    {t('contact.social.email.label', 'Email')}
                  </Button>
                </Link>
              </ListItem>
            </List>
          </Section>
        </Container>
      </Layout>
    </>
  )
}

export default Page
