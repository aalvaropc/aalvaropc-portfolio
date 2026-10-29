import Section from '../components/section'
import { WorkGridItem } from '../components/grid-items'
import ProjectsComingSoon from '../components/projects-coming-soon'
import thumbUpkeep from '../public/images/works/upkeep/upkeep_dashboard.png'
import thumbLogiops from '../public/images/works/logiops/logiops_home.png'
import thumbPusaq from '../public/images/works/pusaq/pusaq_thumb.png'
import thumbLynix from '../public/images/works/lynix/lynix_run.png'
import thumbOnesqlx from '../public/images/works/onesqlx/onesqlx_editor.png'
import Layout from '../components/layouts/article'
import { useI18n } from '../lib/i18nContext'
import { isProjectVisible } from '../lib/works-visibility'

const thumbnailMap = {
  upkeep: thumbUpkeep,
  'logiops-ai': thumbLogiops,
  pusaq: thumbPusaq,
  lynix: thumbLynix,
  onesqlx: thumbOnesqlx
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
