import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-items'
import thumbRmap from '../public/images/works/rmap.png'
import thumbCovid from '../public/images/works/covid.png'
import thumbLexer from '../public/images/works/lexer.png'
import thumbFarmaLuren from '../public/images/works/farmaLuren.png'
import thumbWebDevfest from '../public/images/works/webdevfest.png'
import thumbAppDevfest from '../public/images/works/appdevfest.png'
import thumbNumzzle from '../public/images/works/numzzle/numzzle_game.png'
import thumbAnalisisWD from '../public/images/works/analisisWD/analisisWD_dashboard.jpg'
import thumbCineflix from '../public/images/works/database.jpg'
import thumbUserBehaviorPipeline from '../public/images/works/userBehaviorPipeline/pipeline.png'
import Layout from '../components/layouts/article'
import { useI18n } from '../lib/i18nContext'

const Works = () => {
  const { getWorks } = useI18n()
  const worksData = getWorks()

  // Mapping de thumbnails para cada proyecto
  const thumbnailMap = {
    userBehaviorPipeline: thumbUserBehaviorPipeline,
    farmaLuren: thumbFarmaLuren,
    rmap: thumbRmap,
    cineflix: thumbCineflix,
    covid: thumbCovid,
    numzzle: thumbNumzzle,
    analisisWD: thumbAnalisisWD,
    webDevfest: thumbWebDevfest,
    appDevfest: thumbAppDevfest,
    lexer: thumbLexer
  }

  return (
    <Layout>
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          {worksData?.title || 'Proyectos'}
        </Heading>

        <SimpleGrid columns={[1, 1, 2]} gap={6}>
          {worksData?.projects?.map((project, index) => (
            <Section key={project.id} delay={0.1 + (index * 0.1)}>
              <WorkGridItem
                id={project.id}
                title={project.title}
                thumbnail={thumbnailMap[project.id] || project.thumbnail}
                _hover={{ cursor: 'pointer' }}
              >
                {project.description}
              </WorkGridItem>
            </Section>
          )) || (
            // Fallback en caso de que no haya datos
            <>
              <Section delay={0.1}>
                <WorkGridItem
                  id="userBehaviorPipeline"
                  title="UserBehaviorPipeline"
                  thumbnail={thumbUserBehaviorPipeline}
                  _hover={{ cursor: 'pointer' }}
                >
                  Pipeline para análisis de comportamiento de usuarios
                </WorkGridItem>
              </Section>

              <Section delay={0.1}>
                <WorkGridItem
                  id="cineflix"
                  title="Cineflix"
                  thumbnail={thumbCineflix}
                  _hover={{ cursor: 'pointer' }}
                >
                  Base de datos para gestionar operaciones de un cine
                </WorkGridItem>
              </Section>

              <Section delay={0.2}>
                <WorkGridItem
                  id="rmap"
                  title="Rmap"
                  thumbnail={thumbRmap}
                  _hover={{ cursor: 'pointer' }}
                >
                  App de reciclaje con gamificación
                </WorkGridItem>
              </Section>

              <Section delay={0.2}>
                <WorkGridItem
                  id="covid"
                  title="CovidAnalytics"
                  thumbnail={thumbCovid}
                  _hover={{ cursor: 'pointer' }}
                >
                  Análisis de datos de Covid con sql
                </WorkGridItem>
              </Section>

              <Section delay={0.3}>
                <WorkGridItem
                  id="farmaLuren"
                  title="FarmaLuren"
                  thumbnail={thumbFarmaLuren}
                  _hover={{ cursor: 'pointer' }}
                >
                  Sistema de facturación automatizado
                </WorkGridItem>
              </Section>

              <Section delay={0.5}>
                <WorkGridItem
                  id="numzzle"
                  title="Numzzle"
                  thumbnail={thumbNumzzle}
                  _hover={{ cursor: 'pointer' }}
                >
                  Rompecabeza con busqueda de espacio de estado
                </WorkGridItem>
              </Section>
            </>
          )}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}

export default Works
