import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Layout from '../components/Layout'
import BulletinCard from '../components/BulletinCard'

class BulletinsPostPage extends Component {
  render() {
    const { bulletins } = this.props;

    return (
      <>
        <div className="news__banner text-center bg--offwhite">
          <h1 className="nlnv__heading kor-main">교회 주보</h1>
          <hr className="divider divider--green" />
          <a className="nlnv__btn kor-main margin-top-none js-transition" href="/news"><FontAwesomeIcon icon={faChevronLeft} /> 돌아가기</a>
        </div>
        <div className="news__container clearfix text-center bg--offwhite">
          <div className="col-md-12 col-lg-10 offset-lg-1 text-center margin-top-xl">
            <BulletinCard bulletins={bulletins} />
          </div>
        </div>
      </>
    );
  }
}

BulletinsPostPage.propTypes = {
  bulletins: PropTypes.array
}

const Page = ({ pageContext: { bulletins } }) => (
  <Layout>
    <BulletinsPostPage bulletins={bulletins} />
  </Layout>
)

export default Page