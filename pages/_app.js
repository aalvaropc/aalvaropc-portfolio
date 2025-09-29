import { ChakraProvider } from "@chakra-ui/react";
import Layout from '../components/layouts/main'
import theme from "../lib/theme";
import Fonts from "../components/font";
import { AnimatePresence } from "framer-motion";
import { I18nProvider } from '../lib/i18nContext';

const Website = ({Component, pageProps, router}) => {
    return (
        <ChakraProvider theme={theme}>
            <I18nProvider>
                <Fonts />
                <Layout router={router}>
                    <AnimatePresence mode='wait' initial={true}>
                        <Component {...pageProps} key={router.route} />
                    </AnimatePresence>
                </Layout>
            </I18nProvider>
        </ChakraProvider>
    )
}

export default Website