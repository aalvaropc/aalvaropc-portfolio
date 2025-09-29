import Head from "next/head";
import Navbar from '../navbar.jsx'
import { Box, Container } from "@chakra-ui/react";
import React from "react";
import dynamic from 'next/dynamic'
import FractalTreeLoader from '../fractal-tree-loader.js'
import Footer from '../Footer'
import LoadingScreen from '../LoadingScreen'
import { useI18n } from '../../lib/i18nContext'

const LazyFractalTree = dynamic(() => import('../pure-fractal-tree.js'), {
    ssr: false,
    loading: () => <FractalTreeLoader />
})

const Main = ({ children, router }) => {
    const { isLoading } = useI18n()

    if (isLoading) {
        return <LoadingScreen message="Cargando..." />
    }

    return (
        <Box as="main" pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Alvaro Peña - Backend Developer</title>
                <meta name="description" content="Backend-focused Full Stack Developer especializado en Go, Python y Java. Experto en microservicios y arquitecturas escalables." />
            </Head>
            <Navbar path={router.asPath}>
            </Navbar>
            <Container maxW="container.md" pt={14}>
                <LazyFractalTree />

                {children}
                <Footer />
            </Container>

        </Box>
    )
}
export default Main
