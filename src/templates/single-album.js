import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Masonry from 'react-masonry-component'
import Layout from '../components/Layout'

class SingleAlbumPage extends Component {
  state = {
    images: []
  }

  componentDidMount() {
    const elem= document.createElement("div")
    elem.innerHTML = this.props.album.gallery_images
    const imageStrings = elem.getElementsByTagName("img")
    let images = []
    for (let i = 0; i < imageStrings.length; i++) {
      const currentImg = imageStrings[i].src
      const imgRegex = /-(\d*)x(\d*)/
      const checkRegex = imgRegex.exec(currentImg)
      if (checkRegex) currentImg = currentImg.replace(checkRegex[0], '')
      images.push(currentImg)
    }
    this.setState({ images })
  }

  render() {
    const { images } = this.state
    const { album } = this.props
    const masonryOptions = {
      percentPosition: true
    }

    return (
      <>
        <div className="photo__banner text-center bg--offwhite">
          <h1 className="nlnv__heading kor-main">{album.gallery_title}</h1>
          <hr className="divider divider--green" />
          <a className="nlnv__btn kor-main margin-top-none js-transition" href="/album"><FontAwesomeIcon icon={faChevronLeft} /> 돌아가기</a>
        </div>
        <div className="photo__container bg--offwhite">
          <Masonry className={`photo__wrapper`} options={masonryOptions}>
            {images.map((image, i) => (
              <div className="col-md-4 col-sm-6 col-xs-12 photo__popup" key={i}>
                <img src={image} alt="" />
              </div>
            ))}
          </Masonry>
        </div>
      </>
    );
  }
}

SingleAlbumPage.propTypes = {
  album: PropTypes.object,
}

const Page = ({ data }) => {
  const { wordpressAcfAlbums: { acf: album } } = data

  return (
    <Layout>
      <SingleAlbumPage album={album} />
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
    wordpressAcfAlbums(
      wordpress_id: {
        eq: $id
      }
    ) {
      acf {
        gallery_title
        gallery_images
      }
    }
  }
`