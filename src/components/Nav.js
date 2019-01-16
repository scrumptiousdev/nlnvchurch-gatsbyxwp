import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faBars, faLeaf, faQuoteRight, faBullhorn, faCameraRetro, faHeart, faMapSigns } from '@fortawesome/free-solid-svg-icons'
import github from '../img/github-icon.svg'
import logo from '../img/logo.svg'

const Navbar = () => (
  <StaticQuery
    query={graphql`
      query {
        allWordpressPage(sort: { fields: wordpress_id }, limit: 5) {
          edges {
            node {
              title
              slug
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <div className="nav__overlay"></div>
        <nav className="nav">
          <a className="js-transition nav__link nav__link-mobile" href="#">
            <FontAwesomeIcon className="" icon={faBars} />
          </a>
          <a className="js-transition nav__link nav__link-logo" href="/">
            <p className="nav__text">NL<br />NV</p>
          </a>
          <a className="js-transition nav__link" href="/about">
            <FontAwesomeIcon className="nav__icon" icon={faLeaf} />
            <p className="nav__text kor-main">교회소개</p>
          </a>
          <a className="js-transition nav__link" href="/series">
            <FontAwesomeIcon className="nav__icon" icon={faQuoteRight} />
            <p className="nav__text kor-main">설교영상</p>
          </a>
          <a className="js-transition nav__link" href="/news">
            <FontAwesomeIcon className="nav__icon" icon={faBullhorn} />
            <p className="nav__text kor-main">교회소식</p>
          </a>
          <a className="js-transition nav__link" href="/album">
            <FontAwesomeIcon className="nav__icon" icon={faCameraRetro} />
            <p className="nav__text kor-main">사진첩</p>
          </a>
          <a className="js-transition nav__link" href="/support">
            <FontAwesomeIcon className="nav__icon" icon={faHeart} />
            <p className="nav__text kor-main">협력/후원</p>
          </a>
          <a className="js-transition nav__link" href="/directions">
            <FontAwesomeIcon className="nav__icon" icon={faMapSigns} />
            <p className="nav__text kor-main">찾아오시는길</p>
          </a>

          <a className="nav__social" title="Facebook" href="https://www.facebook.com/pages/New-Life-New-Vision-Church/754157684605483" target="_blank">
            <FontAwesomeIcon className="nav__icon" icon={faFacebookSquare} />
          </a>
          <a className="nav__social" title="YouTube" href="https://www.youtube.com/channel/UCdmLI5xDRzZmNVAch8HCyGg" target="_blank">
            <FontAwesomeIcon className="nav__icon" icon={faYoutube} />
          </a>
        </nav>
      </>
    )}
  />
)

export default Navbar
