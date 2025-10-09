import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
    global: props => ({
        html: {
            overflowX: 'hidden',
        },
        body: {
            bg: mode('#f0e7db', '#202023')(props),
            color: mode('#202023', '#ffffff')(props),
            lineHeight: 1.6,
            overflowX: 'hidden',
            width: '100vw',
            position: 'relative',
        },
        '*': {
            boxSizing: 'border-box',
        },
        '*::placeholder': {
            color: mode('gray.400', 'whiteAlpha.400')(props),
        },
        '*, *::before, *::after': {
            borderColor: mode('gray.200', 'whiteAlpha.300')(props),
            wordWrap: 'break-word',
            maxWidth: '100%',
        },
        // Prevenir overflow horizontal en todos los elementos
        'div, section, article, aside, header, footer, main': {
            maxWidth: '100%',
            overflowWrap: 'break-word',
        },
        // Asegurar que imágenes y videos no rompan el layout
        'img, video, canvas, iframe': {
            maxWidth: '100%',
            height: 'auto',
        },
    })
}

const components = {
    Heading: {
        variants: {
            'section-title': {
                textDecoration: 'underline',
                fontSize: 20,
                textUnderlineOffset: 6,
                textDecorationColor: '#525252',
                textDecorationThickness: 4,
                marginTop: 3,
                marginBottom: 4
            }
        }
    },
    Link: {
        baseStyle: props => ({
            color: mode('#3d7aed', '#ff63c3')(props),
            textUnderlineOffset: 3
        })
    }
}

const fonts = {
    heading: "'M PLUS Rounded 1c'"
}

const colors = {
    grassTeal: '#88ccca',
    brand: {
        50: '#e6f7f7',
        100: '#b3e9e8',
        200: '#80dbd9',
        300: '#4dcdca',
        400: '#1abfbb',
        500: '#88ccca',
        600: '#6bb6b4',
        700: '#4e9f9e',
        800: '#318887',
        900: '#147170',
    }
}

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme