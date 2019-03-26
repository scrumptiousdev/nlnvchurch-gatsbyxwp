module.exports = {
  siteMetadata: {
    title: 'New Life New Vision Church',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: 'wpbackend.nlnvchurch.org',
        hostingWPCOM: false,
        protocol: 'https',
        useACF: true,
        auth: {},
        verboseOutput: true,
        concurrentRequests: 10,
        includedRoutes: [
          "**/posts",
          "**/pages",
          "**/media",
          "**/series",
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-purgecss',
    'gatsby-plugin-netlify'
  ],
}