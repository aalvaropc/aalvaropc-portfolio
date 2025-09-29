import {
    Container,
    Badge,
    Link,
    List,
    ListItem
} from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Title, WorkImage, Meta } from '../../components/work'
import { useWorkDetail } from '../../lib/useWorkDetail'

const Work = () => {
    const { workDetail, loading, error } = useWorkDetail('numzzle')

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
                        <Meta>Repositorio</Meta>
                        <Link href={workDetail.meta.repository}>
                            {workDetail.meta.repository} <ExternalLinkIcon mx="2px" />
                        </Link>
                    </ListItem>
                    <ListItem>
                        <Meta>Plataforma</Meta>
                        <span>{workDetail.meta.platform}</span>
                    </ListItem>
                    <ListItem>
                        <Meta>Stack</Meta>
                        <span>{workDetail.meta.stack}</span>
                    </ListItem>
                </List>

                {workDetail.sections.gameplay && (
                    <>
                        <List ml={4} my={4}>
                            {workDetail.sections.gameplay.items.map((item, index) => (
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
