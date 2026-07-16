import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="es">
                <Head>
                    {/* Basic Meta Tags */}
                    <meta name="description" content="Alvaro Peña - Backend-focused Full Stack Developer especializado en Go, Python, Java y arquitecturas escalables. Especialista en microservicios y sistemas distribuidos." />
                    <meta name="keywords" content="Alvaro Peña, Backend Developer, Full Stack, Go, Python, Java, FastAPI, Spring Boot, Microservices, Guinea Mobile, NTT Data, Perú" />
                    <meta name="author" content="Alvaro Rodrigo Peña Peña" />
                    <meta name="robots" content="index, follow, max-image-preview:large" />
                    <meta name="googlebot" content="index, follow" />
                    <meta name="language" content="Spanish" />
                    <meta name="geo.region" content="PE" />
                    <meta name="geo.country" content="Peru" />
                    <meta name="geo.placename" content="Ica, Peru" />
                    
                    {/* Open Graph Tags */}
                    <meta property="og:type" content="profile" />
                    <meta property="og:title" content="Alvaro Peña - Backend-focused Full Stack Developer" />
                    <meta property="og:description" content="Backend Developer especializado en Go, Python y Java. Experto en microservicios, arquitecturas escalables y sistemas distribuidos." />
                    <meta property="og:url" content="https://aalvaropc.vercel.app" />
                    <meta property="og:image" content="https://aalvaropc.vercel.app/og.png" />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />
                    <meta property="og:image:type" content="image/png" />
                    <meta property="og:image:alt" content="Alvaro Peña - Backend-focused Full Stack Developer" />
                    <meta property="og:locale" content="es_PE" />
                    <meta property="og:site_name" content="Alvaro Peña - Portfolio Profesional" />
                    <meta property="profile:first_name" content="Alvaro" />
                    <meta property="profile:last_name" content="Peña" />
                    <meta property="profile:username" content="aalvaropc" />
                    
                    {/* Twitter Card Tags */}
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@aalvaropc" />
                    <meta name="twitter:creator" content="@aalvaropc" />
                    <meta name="twitter:title" content="Alvaro Peña - Backend Developer" />
                    <meta name="twitter:description" content="Backend-focused Full Stack Developer especializado en Go, Python y Java. Experto en microservicios y arquitecturas escalables." />
                    <meta name="twitter:image" content="https://aalvaropc.vercel.app/og.png" />
                    <meta name="twitter:image:alt" content="Alvaro Peña - Backend-focused Full Stack Developer" />
                    
                    {/* LinkedIn Tags */}
                    <meta property="linkedin:owner" content="aalvarop-pe" />
                    
                    {/* Favicon and Icons */}
                    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    
                    {/* PWA Manifest */}
                    <link rel="manifest" href="/manifest.json" />
                    
                    {/* Canonical URL */}
                    <link rel="canonical" href="https://aalvaropc.vercel.app" />
                    
                    {/* Alternate Languages for SEO */}
                    <link rel="alternate" href="https://aalvaropc.vercel.app" hrefLang="es" />
                    <link rel="alternate" href="https://aalvaropc.vercel.app" hrefLang="en" />
                    <link rel="alternate" href="https://aalvaropc.vercel.app" hrefLang="x-default" />
                    
                    {/* Fonts self-hosted via next/font (Geist) — no external requests */}

                    {/* Theme and PWA */}
                    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
                    <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
                    <meta name="application-name" content="Alvaro Peña Portfolio" />
                    
                    {/* JSON-LD Structured Data */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Person",
                                "name": "Alvaro Rodrigo Peña Peña",
                                "alternateName": "Alvaro Peña",
                                "description": "Backend-focused Full Stack Developer especializado en Go, Python, Java y arquitecturas escalables",
                                "url": "https://aalvaropc.vercel.app",
                                "image": "https://aalvaropc.vercel.app/og.png",
                                "sameAs": [
                                    "https://github.com/aalvaropc",
                                    "https://linkedin.com/in/aalvarop-pe",
                                    "mailto:aalvaropc@gmail.com"
                                ],
                                "jobTitle": "Backend Developer",
                                "worksFor": {
                                    "@type": "Organization",
                                    "name": "Guinea Mobile"
                                },
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressCountry": "PE",
                                    "addressRegion": "Ica"
                                },
                                "knowsAbout": [
                                    "Go",
                                    "Python",
                                    "Java",
                                    "FastAPI",
                                    "Spring Boot",
                                    "Microservices",
                                    "Backend Development",
                                    "Software Architecture"
                                ]
                            })
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
