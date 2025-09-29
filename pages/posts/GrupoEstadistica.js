import {
    Container,
    Badge,
    Link,
    List,
    ListItem,
    AspectRatio
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, PostImage, Meta } from '../../components/post'
import { usePostDetail } from '../../lib/usePostDetail'
import { useI18n } from '../../lib/i18nContext'

const GrupoEstadistica = () => {
    const { postDetail, loading, error } = usePostDetail('GrupoEstadistica')
    const { t } = useI18n()

    if (loading) return <Layout title="Loading..."><Container>Loading...</Container></Layout>
    if (error) return <Layout title="Error"><Container>Error loading content</Container></Layout>
    if (!postDetail) return <Layout title="Not Found"><Container>Content not found</Container></Layout>

    return (
        <Layout title={postDetail.title}>
            <Container>
                <Title>
                    {postDetail.title} <Badge>{postDetail.year}</Badge>
                </Title>
                <p style={{ textAlign: 'justify' }}>
                    {postDetail.description}
                </p>

                <List ml={4} my={4}>
                    <ListItem>
                        <Meta>{t('metadata.slides')}</Meta>
                        <Link href={postDetail.meta.slides}>
                            {postDetail.meta.slides} <ExternalLinkIcon mx="2px" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Meta>{t('metadata.presentation')}</Meta>
                        <Link href={postDetail.meta.presentation}>
                            {postDetail.meta.presentation} <ExternalLinkIcon mx="2px" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Meta>{t('metadata.tags')}</Meta>
                        <span>{postDetail.meta.tags}</span>
                    </ListItem>
                </List>

                {postDetail.sections.chapters && (
                    <>
                        <List ml={4} my={4}>
                            {postDetail.sections.chapters.items.map((item, index) => (
                                <ListItem key={index}>
                                    <p><Meta>{item.topic}</Meta> {item.description}</p>
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}

                {postDetail.sections.images?.map((image, index) => (
                    <div key={index}>
                        <PostImage src={image.src} alt={image.alt} />
                    </div>
                ))}

                {postDetail.sections.video && (
                    <AspectRatio maxW="640px" ratio={1.7} my={4}>
                        <iframe
                            width="1519"
                            height="581"
                            src={postDetail.sections.video.url}
                            title={postDetail.sections.video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                            allowFullScreen
                        ></iframe>
                    </AspectRatio>
                )}
            </Container>
        </Layout>
    )
}

export default GrupoEstadistica
