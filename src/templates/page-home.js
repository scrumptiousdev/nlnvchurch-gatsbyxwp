import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import moment from 'moment'
import Layout from '../components/Layout'
import NewsCard from '../components/NewsCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faFilm, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

export class HomePage extends Component {
  componentDidMount() {
    const { homeContent } = this.props;
    const serviceStartTime = homeContent.nlnv_service_countdown_time.split(':');
    const today = new Date();
    const sunday = new Date();

    sunday.setDate(today.getDate() - today.getDay());
    sunday.setHours(parseInt(serviceStartTime[0]));
    sunday.setMinutes(parseInt(serviceStartTime[1]));
    sunday.setSeconds(parseInt(serviceStartTime[2]));
    sunday.setMilliseconds(0);

    if (sunday < today) sunday.setDate(sunday.getDate() + 7);

    const countDownDate = new Date(sunday).getTime();

    setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = this.addZero(Math.floor(distance / (1000 * 60 * 60 * 24)));
      const hours = this.addZero(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const minutes = this.addZero(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      const seconds = this.addZero(Math.floor((distance % (1000 * 60)) / 1000));
      
      document.querySelector('.home__join-time').innerHTML = days + ":" + hours + ":" + minutes + ":" + seconds;
    }, 1000);
  }

  addZero = (n) => {
    return n < 10 ? '0' + n : '' + n;
  }

  render() {
    const { homeContent, contactContent, videos, news } = this.props;

    return (
      <>
        <div className="home__banner">
          <div className="home__banner-text-container">
            <h1 className="home__banner-text">
              <span className="home__banner-text--sub kor-sub">{homeContent.nlnv_church_slogan}</span>
              <span className="home__banner-text--main">New Life<span className="break-414"> </span>New Vision<span className="break-414"> </span>Church</span>
            </h1>
            <a className="home__banner-arrow js-scroll" href="#first"><i className="fa fa-angle-double-down" aria-hidden="true"></i></a>
          </div>
        </div>
        <div id="first" className="home__container home__service clearfix">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h2 className="nlnv__heading kor-main">{homeContent.nlnv_service_title}</h2>
            <hr className="divider divider--green" />
            <div
              className="home__service-times kor-main"
              dangerouslySetInnerHTML={{ __html: homeContent.nlnv_service_time }}
            />
            <div className="home__join">
              <h2 className="home__join-title">Come <span className="accent--light">Join</span> Us!</h2>
              <h3 className="home__join-time"></h3>
              <p className="home__join-label">DAYS HRS MINS SECS</p>
              <p className="home__join-for">For Sunday Service</p>
            </div>
          </div>
        </div>
        <div className="home__container home__message clearfix">
          <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <h2 className="home__message-title">{videos.nlnv_series.slug === '5min' ? '5분' : '주일'} 설교영상</h2>
            <a className="home__message-btn kor-main js-transition" href="/series"><FontAwesomeIcon icon={faFilm} /> 영상 더보기</a>
            <iframe className="home__message-iframe" width="100%" height="500" src={`https://www.youtube.com/embed/${videos.nlnv_youtube_video_id}?rel=0`} frameBorder="0" allowFullScreen></iframe>
            <hr className="divider divider--green" />
            <div className="home__message-desc text-center kor-main">
              {(videos.nlnv_series.slug !== '5min' && videos.nlnv_series.slug !== 'etc') ? (
                <p>{`${videos.nlnv_series.name} 시리즈 #${videos.nlnv_series_number}`}</p>
              ) : null}
              <p>{videos.nlnv_video_title_korean}</p>
              {videos.nlnv_video_title_english !== '' && <p>{videos.nlnv_video_title_english}</p>}
              <p>{videos.nlnv_scripture}</p>
              <p>{moment(videos.nlnv_video_date).format('MMM DD, YYYY')}</p>
            </div>
          </div>
        </div>
        <div className="home__container home__container--blue clearfix">
          <div className="col-md-12 col-lg-10 offset-lg-1 text-center">
            <h2 className="nlnv__heading">교회 소식</h2>
            <hr className="divider divider--gold divider--margin-b-lg" />
            <NewsCard news={news} />
          </div>
        </div>
        <div className="connect__container">
          <div className="connect__wrapper">
            <h2 className="nlnv__heading">Connect with us</h2>
            <hr className="divider divider--darkgreen" />
            <div className="connect__icon-wrapper">
              <a className="connect__icon" href={`mailto:${contactContent.nlnv_contact_email}`} target="_blank"><FontAwesomeIcon icon={faEnvelope} /></a>
              <a className="connect__icon" href={`tel:${contactContent.nlnv_contact_phone}`}><FontAwesomeIcon icon={faPhone} /></a>
              <a className="connect__icon" href={contactContent.nlnv_social_facebook} target="_blank"><FontAwesomeIcon icon={faFacebookSquare} /></a>
              <a className="connect__icon" href={contactContent.nlnv_social_youtube} target="_blank"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

HomePage.propTypes = {
  homeContent: PropTypes.object.isRequired,
  contactContent: PropTypes.object.isRequired,
  videos: PropTypes.object.isRequired,
  news: PropTypes.array.isRequired
}

const Page = ({ data }) => {
  const { allWordpressPage: pages, allWordpressAcfMessages: videos, allWordpressAcfNews: news } = data
  const homePage = pages.edges[0];
  const contactPage = pages.edges[1];

  return (
    <Layout>
      <HomePage homeContent={homePage.node.acf} contactContent={contactPage.node.acf} videos={videos.edges[0].node.acf} news={news.edges} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query HomePage($id: String!) {
    allWordpressPage(
      filter: {
        id: {
          in: [$id, "4335bc5c-e4aa-50ae-98a7-0c36e4e8004f"]
        }
      }
      sort: {
        fields: wordpress_id
        order: ASC
      }
    ) {
      edges {
        node {
          acf {
            nlnv_church_slogan
            nlnv_service_title
            nlnv_service_time
            nlnv_service_countdown_time
            nlnv_contact_email
            nlnv_contact_phone
            nlnv_social_youtube
            nlnv_social_facebook
          }
        }
      }
    }
    allWordpressAcfMessages(
      sort: {
        fields: acf___nlnv_video_date
        order: DESC
      },
      limit: 1
    ) {
      edges {
        node {
          acf {
            nlnv_youtube_video_id
            nlnv_video_date
            nlnv_video_title_korean
            nlnv_video_title_english
            nlnv_scripture
            nlnv_series_number
            nlnv_series {
              name
              slug
            }
          }
        }
      }
    }
    allWordpressAcfNews(
      filter: {
        acf: {
          nlnv_news_featured: {
            eq: true
          }
        }
      }
      sort: {
        fields: acf___nlnv_news_date
        order: DESC
      }
      limit: 3
    ) {
      edges {
        node {
          id
          acf {
            nlnv_news_featured
            nlnv_news_recurring
            nlnv_news_title
            nlnv_news_subtitle
            nlnv_news_details
            nlnv_news_date
            nlnv_news_image {
              source_url
            }
          }
        }
      }
    }
  }
`