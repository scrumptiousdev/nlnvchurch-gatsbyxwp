import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Slider from "react-slick"
import Layout from '../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faYoutube, faVimeo, faTwitter, faPinterest, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faChevronLeft, faChevronRight, faEnvelope } from '@fortawesome/free-solid-svg-icons'

class SupportPage extends Component {
  next = (e) => {
    e.preventDefault()
    this.slider.slickNext()
  }
  previous = (e) => {
    e.preventDefault()
    this.slider.slickPrev()
  }

  render() {
    const { page } = this.props

    let supports = []
    for (let i = 1; i <= 3; i++) {
      supports.push({
        logo: page[`support_${i}_logo`].source_url,
        background: page[`support_${i}_background_image`].source_url,
        title: page[`support_${i}_title`],
        subtitle: page[`support_${i}_subtitle`],
        link: page[`support_${i}_link`],
        type: page[`support_${i}_type`],
        socials: {
          facebook: page[`support_${i}_social_links`].facebook,
          email: page[`support_${i}_social_links`].email,
          vimeo: page[`support_${i}_social_links`].vimeo,
          twitter: page[`support_${i}_social_links`].twitter,
          youtube: page[`support_${i}_social_links`].youtube,
          pinterest: page[`support_${i}_social_links`].pinterest,
          instagram: page[`support_${i}_social_links`].instagram,
        }
      })
    }

    const sliderSettings = {
      dots: false,
      infinite: true,
      slidesToShow: 1,
      arrows: false,
      fade: true,
      autoplay: true,
      autoplaySpeed: 10000
    }

    return (
      <div className="support__container">
        <Slider className="support__slider" {...sliderSettings} ref={c => (this.slider = c)}>
          {supports.map(support => {
            return (
              <>
                <div className="support__slide text-center" style={{ backgroundImage: `url(${support.background})` }}>
                  <div className="col-sm-6 offset-sm-3">
                    <a href={support.link} target="_blank" rel="noopener noreferrer">
                      <img className="support__slide-logo" src={support.logo} alt={support.title} />
                    </a>
                    <h2 className="support__slide-title kor-main">{support.title}<br />{support.subtitle}</h2>
                    <hr className="divider divider--darkgreen" />
                    <h3 className="support__slide-subtitle kor-main">{support.type}</h3>
                    <div className="connect__icon-wrapper connect__icon-wrapper--dark connect__icon-wrapper--full">
                      {support.socials.facebook && <a className="connect__icon" href={support.socials.facebook} target="_blank"><FontAwesomeIcon icon={faFacebookSquare} /></a>}
                      {support.socials.email && <a className="connect__icon" href={`mailto:${support.socials.email}`}><FontAwesomeIcon icon={faEnvelope} /></a>}
                      {support.socials.vimeo && <a className="connect__icon" href={support.socials.vimeo} target="_blank"><FontAwesomeIcon icon={faVimeo} /></a>}
                      {support.socials.twitter && <a className="connect__icon" href={support.socials.twitter} target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>}
                      {support.socials.youtube && <a className="connect__icon" href={support.socials.youtube} target="_blank"><FontAwesomeIcon icon={faYoutube} /></a>}
                      {support.socials.pinterest && <a className="connect__icon" href={support.socials.pinterest} target="_blank"><FontAwesomeIcon icon={faPinterest} /></a>}
                      {support.socials.instagram && <a className="connect__icon" href={support.socials.instagram} target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>}
                    </div>
                  </div>
                </div>
              </>
            )
          })}
        </Slider>

        <div className="support__navigation">
          <a className="support__navigation-btn support__navigation-btn-prev" href="#" onClick={this.previous}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </a>
          <a className="support__navigation-btn support__navigation-btn-next" href="#" onClick={this.next}>
            <FontAwesomeIcon icon={faChevronRight} />
          </a>
        </div>
      </div>
    );
  }
}

SupportPage.propTypes = {
  page: PropTypes.object
}

const Page = ({ data }) => {
  const { wordpressPage: { acf: page } } = data

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
      acf {
        support_1_logo {
          source_url
        }
        support_1_background_image {
          source_url
        }
        support_1_title
        support_1_subtitle
        support_1_link
        support_1_type
        support_1_social_links {
          facebook
          email
          vimeo
          twitter
          youtube
          pinterest
          instagram
        }
        support_2_logo {
          source_url
        }
        support_2_background_image {
          source_url
        }
        support_2_title
        support_2_subtitle
        support_2_link
        support_2_type
        support_2_social_links {
          facebook
          email
          vimeo
          twitter
          youtube
          pinterest
          instagram
        }
        support_3_logo {
          source_url
        }
        support_3_background_image {
          source_url
        }
        support_3_title
        support_3_subtitle
        support_3_link
        support_3_type
        support_3_social_links {
          facebook
          email
          vimeo
          twitter
          youtube
          pinterest
          instagram
        }
      }
    }
  }
`
