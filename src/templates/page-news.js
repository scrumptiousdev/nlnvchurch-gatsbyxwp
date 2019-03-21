import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight, faDownload } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/Layout'
import NewsCard from '../components/NewsCard'

class NewsPage extends Component {
  render() {
    const { news, bulletins } = this.props;

    return (
      <>
        <div className="news__banner text-center bg--offwhite">
          <h1 className="nlnv__heading kor-main">교회 소식</h1>
          <hr className="divider divider--green" />
          <a className="nlnv__btn kor-main margin-top-none js-scroll" href="#bulletin"><FontAwesomeIcon icon={faChevronDown} /> 주보 보기</a>
        </div>
        <div className="news__container bg--offwhite clearfix">
          <div className="col-md-12 col-lg-10 offset-lg-1 text-center">
            <NewsCard news={news} />
          </div>
        </div>
        <div id="bulletin" className="news__container clearfix text-center bg--darkgrey text--white">
          <h1 className="nlnv__heading kor-main">교회 주보</h1>
          <hr className="divider divider--green" />
          <a className="nlnv__btn kor-main margin-top-none js-transition" href="/bulletins"><FontAwesomeIcon icon={faChevronRight} /> 지난 주보 보기</a>
          <div className="col-md-12 col-lg-10 offset-lg-1 text-center margin-top-xl">
            <div className="container-fluid">
              <div className="row">
                {bulletins.map(bulletin => {
                  const singleBulletin = bulletin.node.acf;

                  return (
                    <div className="col-sm-3 col-xs-6 bulletin__card" key={`${singleBulletin.date}${singleBulletin.version}`}>
                      <a href={singleBulletin.pdf_file.source_url} className="bulletin__card-img-wrap" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon className="bulletin__card-icon" icon={faDownload} />
                        <img className="bulletin__card-img" src={singleBulletin.poster.source_url} alt="" />
                      </a>
                      <p className="bulletin__card-title kor-main">{moment(singleBulletin.date).format('MMM DD, YYYY')}</p>
                      <p className="bulletin__card-title kor-main">{singleBulletin.version}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

NewsPage.propTypes = {
  news: PropTypes.array,
  bulletins: PropTypes.array
}

const Page = ({ data }) => {
  const { allWordpressAcfNews, allWordpressAcfBulletin } = data

  return (
    <Layout>
      <NewsPage news={allWordpressAcfNews.edges} bulletins={allWordpressAcfBulletin.edges} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query NewsPage {
    allWordpressAcfNews {
      edges {
        node {
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
    allWordpressAcfBulletin(
      limit: 8
      sort: {
        fields: acf___date
        order: DESC
      }
    ) {
      edges {
        node {
          acf {
            date
            version
            poster {
              source_url
            }
            pdf_file {
              source_url
            }
          }
        }
      }
    }
  }
`
