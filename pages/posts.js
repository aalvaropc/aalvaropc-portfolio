import Layout from '../components/layouts/article'
import Section from '../components/section'
import { PostGridItem } from '../components/grid-items'
import thumbEdaWlp from '../public/images/posts/wlp/EdaWlp.png'
import thumbEstGrupo from '../public/images/posts/estadistica/portada-diapo.png'
import { useI18n } from '../lib/i18nContext'

const Posts = () => {
  const { getPosts, locale } = useI18n()
  const postsData = getPosts()

  // Mapping de thumbnails para cada post
  const thumbnailMap = {
    GrupoEstadistica: thumbEstGrupo,
    ArqBasadaEventos: thumbEdaWlp
  }

  return (
    <Layout title="Publicaciones">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">
        {postsData?.title || 'Publicaciones'}
      </h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {postsData?.articles?.map((article, index) => (
            <Section key={article.id} delay={0.1 + index * 0.1}>
              <PostGridItem
                id={article.id}
                title={article.title}
                thumbnail={thumbnailMap[article.id] || article.thumbnail}
                date={article.date}
                readTime={article.readTime}
                locale={locale}
              >
                {article.description}
              </PostGridItem>
            </Section>
          )) || (
            // Fallback en caso de que no haya datos
            <>
              <Section>
                <PostGridItem
                  id="GrupoEstadistica"
                  title="Grupo Estudio: Estadística práctica para ciencia de datos con R y Python"
                  thumbnail={thumbEstGrupo}
                  _hover={{ cursor: 'pointer' }}
                >
                  Participación en el grupo de estudio
                </PostGridItem>
              </Section>
              <Section>
                <PostGridItem
                  id="ArqBasadaEventos"
                  title="Arquitectura Basada en Eventos con AWS"
                  thumbnail={thumbEdaWlp}
                  _hover={{ cursor: 'pointer' }}
                >
                  Charla brindada para el Weekend Lernning Path
                </PostGridItem>
              </Section>
            </>
          )}
      </div>
    </Layout>
  )
}

export default Posts
