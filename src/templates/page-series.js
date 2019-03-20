import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import moment from 'moment'
import Layout from '../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'

class SeriesPage extends Component {
  render() {
    const { series, videos } = this.props;
    const latestMessage = videos[0].node.acf;

    return (
      <>
        <div className="home__container home__container--sm home__message home__container--dark clearfix">
          <div className="row">
            <div className="col-md-6 offset-md-0 col-lg-5 offset-lg-1 margin-top-md margin-bottom-md">
              <div className="col-md-12">
                <iframe className="home__message-iframe home__message-iframe--sm" width="100%" height="500" src={`https://www.youtube.com/embed/${latestMessage.nlnv_youtube_video_id}?rel=0`} frameBorder="0" allowFullScreen title="s" />
              </div>
            </div>
            <div className="col-md-6 col-lg-5 margin-top-md margin-bottom-md">
              <div className="col-md-12">
                <h2 className="home__message-title margin-top-none margin-bottom-none">{moment(latestMessage.nlnv_video_date).format('MMM DD, YYYY')}</h2>
                <hr className="divider divider--left divider--green" />
                <div className="home__message-desc kor-main">
                  {(latestMessage.nlnv_series.slug !== '5min' && latestMessage.nlnv_series.slug !== 'etc') ? (
                    <p>{`${latestMessage.nlnv_series.name} 시리즈 #${latestMessage.nlnv_series_number}`}</p>
                  ) : null}
                  <p>{latestMessage.nlnv_video_title_korean}</p>
                  {latestMessage.nlnv_video_title_english !== '' && <p>{latestMessage.nlnv_video_title_english}</p>}
                  <p>{latestMessage.nlnv_scripture}</p>
                </div>
                <a className="nlnv__btn kor-main js-transition" href={`/series/${latestMessage.nlnv_series.slug}`}><FontAwesomeIcon icon={faHashtag} /> {latestMessage.nlnv_series.name} 시리즈 더보기</a>
                <div>
                  <a className="nlnv__btn nlnv__btn--solid kor-main js-transition" href="/messages"><FontAwesomeIcon icon={faHashtag} /> 모든 영상 보기</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="messages__container bg--offwhite clearfix">
          <div className="col-md-12 offset-md-0 col-lg-10 offset-lg-1 text-center">
            <h2 className="nlnv__heading">설교 시리즈</h2>
            <hr className="divider divider--green" />
          </div>
          <div className="col-md-12 offset-md-0 col-lg-10 offset-lg-1">
            <div className="row">
              {series.map(seriesObj => {
                const { name, slug, count } = seriesObj.node;
                let latestMatchedVideo = null;

                for (let i = 0; i < videos.length; i++) {
                  const videoSlug = videos[i].node.acf.nlnv_series.slug;
                  if (videoSlug === slug) {
                    latestMatchedVideo = videos[i].node.acf;
                    break;
                  }
                }

                if (count > 0 && latestMatchedVideo) {
                  return (
                    <div className="col-sm-6 col-md-4 messages__card" key={`${slug}${count}`}>
                      <a className="messages__card-inner js-transition" style={{ backgroundImage: `url(https://i.ytimg.com/vi/${latestMatchedVideo.nlnv_youtube_video_id}/maxresdefault.jpg)` }} href={`/series/${slug}`}>
                        <div className="messages__card-content">
                          <p className="messages__card-desc series__card-title kor-main text-center">{name}</p>
                          <p className="messages__card-desc kor-main text-center">시리즈</p>
                        </div>
                      </a>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

SeriesPage.propTypes = {
  series: PropTypes.array,
  videos: PropTypes.array
}

const Page = ({ data }) => {
  const { allWordpressWpSeries, allWordpressAcfMessages } = data

  return (
    <Layout>
      <SeriesPage series={allWordpressWpSeries.edges} videos={allWordpressAcfMessages.edges} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query SeriesPage {
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
    allWordpressAcfMessages(
      sort: {
        fields: acf___nlnv_video_date
        order: DESC
      }
    ) {
      edges {
        node {
          acf {
            nlnv_series {
              name
              slug
            }
            nlnv_series_number
            nlnv_video_title_korean
            nlnv_video_title_english
            nlnv_scripture
            nlnv_youtube_video_id
            nlnv_video_date
          }
        }
      }
    }
  }
`
