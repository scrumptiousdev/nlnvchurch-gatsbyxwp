import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import Masonry from 'react-masonry-component'
import Layout from '../components/Layout'

class AlbumPage extends Component {
  render() {
    const { albums } = this.props
    const masonryOptions = {
      percentPosition: true
    }

    return (
      <>
        <div className="album__banner text-center bg--offwhite">
          <h1 className="nlnv__heading kor-main">사진첩</h1>
          <hr className="divider divider--green" />
        </div>
        <div className="album__container bg--offwhite">
          <div className="album__wrapper">
            <Masonry options={masonryOptions}>
              {albums.map(album => {
                const { wordpress_id: id, acf: { gallery_title: galleryTitle, gallery_url: galleryUrl, gallery_date: galleryDate, gallery_images: galleryImages } } = album;

                const elem = document.createElement("div")
                elem.innerHTML = galleryImages
                const imageStrings = elem.getElementsByTagName("img")
                let currentImg = imageStrings[0].src
                const imgRegex = /-(\d*)x(\d*)/
                const checkRegex = imgRegex.exec(currentImg)
                if (checkRegex) currentImg = currentImg.replace(checkRegex[0], '')

                return (
                  <div className="album__card col-xs-12 col-sm-6 col-md-4" key={id}>
                    <a href={`/album/${galleryUrl}`} className="album__card-inner js-transition">
                      <div className="album__card-img-wrapper">
                        <FontAwesomeIcon className="album__card-icon" icon={faImages} />
                        <img className="album__card-img" src={currentImg} alt="" />
                      </div>
                      <div className="album__card-content">
                        <h2 className="album__card-title kor-main">{galleryTitle}</h2>
                        <p className="album__card-info">
                          <span className="album__card-date">{moment(galleryDate).format('MMM DD, YYYY')}</span>
                        </p>
                      </div>
                    </a>
                  </div>
                )
              })}
            </Masonry>
          </div>
        </div>
      </>
    );
  }
}

AlbumPage.propTypes = {
  albums: PropTypes.array
}

const Page = ({ pageContext: { albums } }) => (
  <Layout>
    <AlbumPage albums={albums} />
  </Layout>
)

export default Page