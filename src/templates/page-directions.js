import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

class DirectionsPage extends Component {
  render() {
    const { page } = this.props

    return (
      <>
        <div className="directions__banner">
          <h1 className="nlnv__heading kor-main">{page.directions_title}</h1>
          <hr className="divider divider--green" />
          <p className="directions__banner-info">{page.directions_address}</p>
          <p className="directions__banner-info">{page.directions_phone}</p>
        </div>
        <div className="directions__map-container">
          <a href={`https://www.google.com/maps/place/${page.directions_address}`} target="_blank">
            <div className="directions__map" style={{ backgroundImage: `url(${page.directions_map.source_url})` }} />
          </a>
        </div>
      </>
    );
  }
}

DirectionsPage.propTypes = {
  page: PropTypes.object
}

const Page = ({ data }) => {
  const { wordpressPage: { acf: page } } = data

  return (
    <Layout>
      <DirectionsPage page={page} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query DirectionsPage($id: String!) {
    wordpressPage(id: { eq: $id }) {
      acf {
        directions_title
        directions_address
        directions_phone
        directions_map {
          source_url
        }
      }
    }
  }
`