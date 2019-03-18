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
        protocol: 'http',
        useACF: true,
        auth: {},
        verboseOutput: true,
        includedRoutes: [
          "**/*/*/posts",
          "**/*/*/pages",
          "**/*/*/media",
          "**/*/*/categories",
          "**/*/*/tags",
          "**/*/*/taxonomies",
          "**/*/*/users",
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-purgecss',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
