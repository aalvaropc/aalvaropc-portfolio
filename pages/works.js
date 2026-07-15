import Section from '../components/section'
import { WorkGridItem } from '../components/grid-items'
import ProjectsComingSoon from '../components/projects-coming-soon'
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
import { isProjectVisible } from '../lib/works-visibility'

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

const Works = () => {
  const { getWorks } = useI18n()
  const worksData = getWorks()

  const visibleProjects = (worksData?.projects || []).filter(project =>
    isProjectVisible(project.id)
  )

  return (
    <Layout title="Proyectos">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">
        {worksData?.title || 'Proyectos'}
      </h1>

      {visibleProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <Section key={project.id} delay={0.1 + index * 0.1}>
              <WorkGridItem
                id={project.id}
                title={project.title}
                thumbnail={thumbnailMap[project.id] || project.thumbnail}
              >
                {project.description}
              </WorkGridItem>
            </Section>
          ))}
        </div>
      ) : (
        <ProjectsComingSoon
          title={worksData?.comingSoon?.title}
          description={worksData?.comingSoon?.description}
        />
      )}
    </Layout>
  )
}

export default Works
