import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const AboutPage = ({ title, content, acf }) => {
  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {acf.nlnv_page_title}
              </h2>
			        <img src={acf.nlnv_hero_image.source_url} />
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

AboutPage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  return (
    <Layout>
      <AboutPage title={page.title} content={page.content} acf={page.acf} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query AboutPage($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      acf {
        nlnv_page_title
        nlnv_hero_image {
          source_url
        }
      }
    }
  }
`
