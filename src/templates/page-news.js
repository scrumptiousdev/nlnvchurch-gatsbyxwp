import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/Layout'
import NewsCard from '../components/NewsCard'
import BulletinCard from '../components/BulletinCard'

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
            <BulletinCard bulletins={bulletins} />
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
