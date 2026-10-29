import {
  Container,
  Badge,
  Link,
  List,
  ListItem
} from '../../components/content'
import Layout from '../../components/layouts/article'
import { ExternalLinkIcon } from '../../components/content'
import { Title, WorkImage, Meta } from '../../components/work'
import { useWorkDetail } from '../../lib/useWorkDetail'
import { useI18n } from '../../lib/i18nContext'

const Work = () => {
  const { t } = useI18n()
  const { workDetail, loading, error } = useWorkDetail('logiops-ai')

  if (loading) return <Layout title="Loading..."><Container>Loading...</Container></Layout>
  if (error) return <Layout title="Error"><Container>Error loading content</Container></Layout>
  if (!workDetail) return <Layout title="Not Found"><Container>Content not found</Container></Layout>

  return (
    <Layout title={workDetail.title}>
      <Container>
        <Title>
          {workDetail.title} <Badge>{workDetail.year}</Badge>
        </Title>
        <p style={{ textAlign: 'justify' }}>
          {workDetail.description}
        </p>

        <List ml={4} my={4}>
          <ListItem>
            <Meta>{t('work.repository', 'Repositorio')}</Meta>
            <Link href={workDetail.meta.repository}>
              {workDetail.meta.repository} <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          {workDetail.meta.demo && (
            <ListItem>
              <Meta>{t('work.demo', 'Demo')}</Meta>
              <Link href={workDetail.meta.demo}>
                {workDetail.meta.demo} <ExternalLinkIcon mx="2px" />
              </Link>
            </ListItem>
          )}
          <ListItem>
            <Meta>{t('work.platform', 'Plataforma')}</Meta>
            <span>{workDetail.meta.platform}</span>
          </ListItem>
          <ListItem>
            <Meta>{t('work.stack', 'Stack')}</Meta>
            <span>{workDetail.meta.stack}</span>
          </ListItem>
        </List>

        {workDetail.sections.features && (
          <>
            <List ml={4} my={4}>
              {workDetail.sections.features.items.map((item, index) => (
                <ListItem key={index}>
                  <p><Meta>{item.tech}</Meta> {item.description}</p>
                </ListItem>
              ))}
            </List>
          </>
        )}

        {workDetail.sections.images?.map((image, index) => (
          <div key={index}>
            <WorkImage src={image.src} alt={image.alt} />
          </div>
        ))}
      </Container>
    </Layout>
  )
}

export default Work
