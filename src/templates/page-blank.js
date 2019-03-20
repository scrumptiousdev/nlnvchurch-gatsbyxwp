import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

class BlankPage extends Component {
  render() {
    return (
      <p>Series page</p>
    );
  }
}

BlankPage.propTypes = {
  page: PropTypes.object
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  return (
    <Layout>
      <BlankPage page={page} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query BlankPage($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }
`
