import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export class HomePage extends Component {
  componentDidMount() {
    const today = new Date();
    const sunday = new Date();

    sunday.setDate(today.getDate() - today.getDay());
    sunday.setHours(10);
    sunday.setMinutes(0);
    sunday.setSeconds(0);
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
    return (
      <>
        <div className="home__banner">
          <div className="home__banner-text-container">
            <h1 className="home__banner-text">
              <span className="home__banner-text--sub kor-sub">다음 세대를 위해 교회를 개척하는 교회</span>
              <span className="home__banner-text--main">New Life<span className="break-414"> </span>New Vision<span className="break-414"> </span>Church</span>
            </h1>
            <a className="home__banner-arrow js-scroll" href="#first"><i className="fa fa-angle-double-down" aria-hidden="true"></i></a>
          </div>
        </div>
        <div id="first" className="home__container home__service clearfix">
          <div className="col-lg-8 offset-lg-2 text-center">
            <h2 className="nlnv__heading kor-main">예배 안내</h2>
            <hr className="divider divider--green" />
            <p className="home__service-times kor-main"><b>주일예배:</b> 10:00AM (1부) &amp; 12:00PM (2부)</p>
            <p className="home__service-times kor-main"><b>Sunday School:</b> 12:30PM</p>
            <p className="home__service-times kor-main"><b>Youth Group:</b> 11:45AM</p>
            <p className="home__service-times kor-main"><b>수요기도회:</b> 7:00PM</p>
            <p className="home__service-times kor-main"><b>새벽기도회:</b> 5:30AM (화-금) &amp; 6:30AM (토)</p>
            <div className="home__join">
              <h2 className="home__join-title">Come <span className="accent--light">Join</span> Us!</h2>
              <h3 className="home__join-time"></h3>
              <p className="home__join-label">DAYS HRS MINS SECS</p>
              <p className="home__join-for">For Sunday Service</p>
            </div>
          </div>
        </div>
        {/* @if($ytvid) */}
        <div className="home__container home__message clearfix">
          <div className="col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {/* @if($ytvid->series_id !== 1) */}
            <h2 className="home__message-title">주일 설교영상</h2>
            <a className="home__message-btn kor-main js-transition" href="/series"><i className="fa fa-film" aria-hidden="true"></i> 영상 더보기</a>
            {/* @else */}
            <h2 className="home__message-title">5분 설교영상</h2>
            <a className="home__message-btn kor-main js-transition" href="/messages/{{$ytvid->full_id}}"><i className="fa fa-film" aria-hidden="true"></i> FULL 영상 보기</a>
            {/* @endif */}
            <iframe className="home__message-iframe" width="100%" height="500" src="https://www.youtube.com/embed/{{ $ytvid->video_id }}?rel=0" frameBorder="0" allowFullScreen></iframe>
            <hr className="divider divider--green" />
            <div className="home__message-desc text-center kor-main">
              <p>Video Description</p>
            </div>
          </div>
        </div>
        {/* @endif */}
        <div className="home__container home__container--blue clearfix">
          <div className="col-md-12 col-lg-10 offset-lg-1 text-center">
            <h2 className="nlnv__heading">교회 소식</h2>
            <hr className="divider divider--gold divider--margin-b-lg" />
            {/* @include('news.cards') */}
          </div>
        </div>
        <div className="connect__container">
          <div className="connect__wrapper">
            <h2 className="nlnv__heading">Connect with us</h2>
            <hr className="divider divider--darkgreen" />
            <div className="connect__icon-wrapper">
              <a className="connect__icon" href="mailto:nlnvchurch@gmail.com" target="_blank"><i className="fa fa-envelope" aria-hidden="true"></i></a>
              <a className="connect__icon" href="tel:310-991-6544"><i className="fa fa-phone" aria-hidden="true"></i></a>
              <a className="connect__icon" href="https://www.facebook.com/pages/New-Life-New-Vision-Church/754157684605483" target="_blank"><i className="fa fa-facebook" aria-hidden="true"></i></a>
              <a className="connect__icon" href="https://www.youtube.com/channel/UCdmLI5xDRzZmNVAch8HCyGg" target="_blank"><i className="fa fa-youtube" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

HomePage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  return (
    <Layout>
      <HomePage title={page.title} content={page.content} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query HomePage($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
    }
  }
`
