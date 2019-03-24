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
  }).then(() => {
    return graphql(`{
      allWordpressAcfBulletin(
        sort: {
          fields: acf___date
          order: DESC
        }
      ) {
        edges {
          node {
            acf {
              date
              version
              poster {
                source_url
              }
              pdf_file {
                source_url
              }
            }
          }
        }
      }
    }`)
  }).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const postBulletinsTemplate = path.resolve(`./src/templates/post-bulletins.js`)
    const allBulletins = result.data.allWordpressAcfBulletin.edges
    const bulletins = process.env.NODE_ENV === 'production' ? getOnlyPublished(allBulletins) : allBulletins

    createPage({
      path: `/bulletins`,
      component: postBulletinsTemplate,
      context: {
        bulletins
      }
    })
  }).then(() => {
    return graphql(`{
      allWordpressWpGallery(
        sort: {
          fields: acf___gallery_date
          order: DESC
        }
      ) {
        nodes {
          wordpress_id
          title
          date
          acf {
            gallery_title
            gallery_url
            gallery_date
            main_image {
              source_url
            }
          }
        }
      }
    }`)
  }).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const albumTemplate = path.resolve(`./src/templates/page-album.js`)
    const singleAlbumTemplate = path.resolve(`./src/templates/single-album.js`)
    const allAlbums = result.data.allWordpressWpGallery.nodes
    const albums = process.env.NODE_ENV === 'production' ? getOnlyPublished(allAlbums) : allAlbums

    createPage({
      path: `/album`,
      component: albumTemplate,
      context: {
        albums
      }
    })

    _.each(albums, ({ wordpress_id: id, acf: { gallery_url: galleryUrl, gallery_title: title } }) => {
      createPage({
        path: `/album/${galleryUrl}/`,
        component: singleAlbumTemplate,
        context: {
          id,
          title
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
