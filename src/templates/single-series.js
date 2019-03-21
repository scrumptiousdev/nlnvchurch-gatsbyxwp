import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faPlayCircle } from '@fortawesome/free-solid-svg-icons'

class SingleSeriesPage extends Component {
  state = {
    currentVideo: this.props.videos[0].node.acf
  }

  handleVideoSwitch = (video) => this.setState({ currentVideo: video })

  render() {
    const { currentVideo } = this.state;
    const { videos } = this.props;
    const seriesInfo = currentVideo.nlnv_series;

    return (
      <div className="home__container home__message clearfix text-center">
        <h2 className="nlnv__heading">{`${seriesInfo.name} 시리즈`}</h2>
        <hr className="divider divider--green margin-bottom-lg" />
        <div className="col-md-12 margin-bottom-lg">
          <a className="nlnv__btn kor-main margin-top-none js-transition" href="/series"><FontAwesomeIcon icon={faChevronLeft} /> 다른 시리즈 보기</a>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 margin-top-sm margin-bottom-lg">
              <div className="col-md-12">
                <iframe className="home__message-iframe home__message-iframe--sm" width="100%" height="500" src={`https://www.youtube.com/embed/${currentVideo.nlnv_youtube_video_id}?rel=0`} frameBorder="0" allowFullScreen></iframe>
                <hr className="divider divider--green" />
                <div className="home__message-desc text-center kor-main">
                  {(currentVideo.nlnv_series.slug !== '5min' && currentVideo.nlnv_series.slug !== 'etc') ? (
                    <p>{`${currentVideo.nlnv_series.name} #${currentVideo.nlnv_series_number}`}</p>
                  ) : null}
                  <p>{currentVideo.nlnv_video_title_korean}</p>
                  {currentVideo.nlnv_video_title_english !== '' && <p>{currentVideo.nlnv_video_title_english}</p>}
                  <p>{currentVideo.nlnv_scripture}</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <div className="container-fluid">
                <div className="row">
                  {videos.map(video => {
                    const singleVideo = video.node.acf;
                    const singleVideoId = singleVideo.nlnv_youtube_video_id;

                    return (
                      <div className="col-sm-6 col-md-12 col-lg-6 messages__card series__card-list" >
                        <a
                          className={`messages__card-inner messages__video-link${ singleVideoId === currentVideo.nlnv_youtube_video_id ? ' messages__card-inner--active' : '' }`}
                          style={{ backgroundImage: `url(https://i.ytimg.com/vi/${singleVideoId}/maxresdefault.jpg` }}
                          href={singleVideoId}
                          onClick={(e) => {
                            e.preventDefault()
                            this.handleVideoSwitch(singleVideo)
                          }}
                        >
                          <p className="messages__card-date kor-main">{moment(singleVideo.nlnv_video_date).format('MMM D, YYYY')}</p>
                          <FontAwesomeIcon className="fa fa-play-circle-o series__card-icon" icon={faPlayCircle} />
                          <div className="messages__card-content">
                            {(singleVideo.nlnv_series.slug !== '5min' && singleVideo.nlnv_series.slug !== 'etc') ? (
                              <p className="messages__card-desc kor-main text-center">{`${singleVideo.nlnv_series.name} #${singleVideo.nlnv_series_number}`}</p>
                            ) : null}
                            <p className="messages__card-desc kor-main text-center">{singleVideo.nlnv_video_title_korean}</p>
                            <p className="messages__card-desc kor-main text-center">{singleVideo.nlnv_scripture}</p>
                            <p className="messages__card-status kor-main text--darkgreen"><FontAwesomeIcon className="fa fa-play-circle-o messages__card-icon" icon={faPlayCircle} /> 재생중</p>
                          </div>
                        </a>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SingleSeriesPage.propTypes = {
  videos: PropTypes.array
}

const Page = ({ data }) => {
  const { allWordpressAcfMessages: { edges } } = data

  return (
    <Layout>
      <SingleSeriesPage videos={edges} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query SingleSeriesPage($id: String!) {
    allWordpressAcfMessages(
      filter: {
        acf: {
          nlnv_series: {
            slug: {
              eq: $id
            }
          }
        }
      }
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