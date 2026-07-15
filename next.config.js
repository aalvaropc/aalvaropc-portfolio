const { HIDE_ALL_PROJECTS } = require('./lib/works-visibility')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  async redirects() {
    // While all projects are hidden, send any direct /works/<id> visit back to
    // the /works "coming soon" page instead of exposing an old project.
    if (!HIDE_ALL_PROJECTS) return []
    return [
      {
        source: '/works/:slug',
        destination: '/works',
        permanent: false
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '0' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https:",
              'frame-src https://www.youtube.com https://open.spotify.com',
              "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://api.bigdatacloud.net"
            ].join('; ')
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
