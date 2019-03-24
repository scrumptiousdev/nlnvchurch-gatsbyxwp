import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Masonry from 'react-masonry-component'
import Layout from '../components/Layout'

class SingleAlbumPage extends Component {
  render() {
    const { album, title } = this.props
    const masonryOptions = {
      percentPosition: true
    }

    return (
      <>
        <div className="photo__banner text-center bg--offwhite">
          <h1 className="nlnv__heading kor-main">{title}</h1>
          <hr className="divider divider--green" />
          <a className="nlnv__btn kor-main margin-top-none js-transition" href="/album"><FontAwesomeIcon icon={faChevronLeft} /> 돌아가기</a>
        </div>
        <div className="photo__container bg--offwhite">
          <Masonry className={`photo__wrapper`} options={masonryOptions}>
            {album.map(photo => (
              <div className="col-md-4 col-sm-6 col-xs-12 photo__popup" key={photo.id}>
                <img src={photo.source_url} alt="" />
              </div>
            ))}
          </Masonry>
        </div>
      </>
    );
  }
}

SingleAlbumPage.propTypes = {
  album: PropTypes.array,
  title: PropTypes.string
}

const Page = ({ data, pageContext: { title, mainPhoto } }) => {
  const { allWordpressWpMedia: { nodes: album } } = data

  return (
    <Layout>
      <SingleAlbumPage album={album} title={title} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
}

export default Page

export const pageQuery = graphql`
  query SingleAlbumPage($id: Int!) {
    allWordpressWpMedia(
      filter: {
        post: {
          eq: $id
        }
      }
    ) {
      nodes {
        id
        source_url
      }
    }
  }
`