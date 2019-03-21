const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const getOnlyPublished = edges => _.filter(edges, ({ node }) => node.status === 'publish')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`{
    allWordpressPage {
      edges {
        node {
          id
          slug
          status
        }
      }
    }
  }`).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const allPages = result.data.allWordpressPage.edges
    const pages = process.env.NODE_ENV === 'production' ? getOnlyPublished(allPages) : allPages

    _.each(pages, ({ node: page }) => {
      let pageTemplatePath = `./src/templates/page.js`
      let pagePath = `/${page.slug}/`

      if (page.slug && page.slug === 'home') {
        pagePath = '/'
        pageTemplatePath = `./src/templates/page-home.js`
      } else if (page.slug && page.slug === 'about') {
        pageTemplatePath = `./src/templates/page-about.js`
      } else if (page.slug && page.slug === 'series') {
        pageTemplatePath = `./src/templates/page-series.js`
      } else if (page.slug && page.slug === 'news') {
        pageTemplatePath = `./src/templates/page-news.js`
      }

      createPage({
        path: pagePath,
        component: path.resolve(pageTemplatePath),
        context: {
          id: page.id,
        },
      })
    })
  }).then(() => {
    return graphql(`{
      allWordpressWpSeries(
        sort: {
          fields: name
          order: ASC
        }
      ) {
        edges {
          node {
            name
            slug
            count
          }
        }
      }
    }`)
  }).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const seriesTemplate = path.resolve(`./src/templates/single-series.js`)
    const allSeries = result.data.allWordpressWpSeries.edges
    const series = process.env.NODE_ENV === 'production' ? getOnlyPublished(allSeries) : allSeries

    _.each(series, ({ node: singleSeries }) => {
      createPage({
        path: `/series/${singleSeries.slug}/`,
        component: seriesTemplate,
        context: {
          id: singleSeries.slug,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
