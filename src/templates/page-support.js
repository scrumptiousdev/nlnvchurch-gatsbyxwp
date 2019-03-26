import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

class SupportPage extends Component {
  render() {
    return (
      <p>Series page</p>
    );
  }
}

SupportPage.propTypes = {
  page: PropTypes.object
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  return (
    <Layout>
      <SupportPage page={page} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query SupportPage($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }
`
