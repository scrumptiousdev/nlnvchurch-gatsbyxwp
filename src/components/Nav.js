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
        <div class="nav__overlay"></div>
        <nav class="nav">
          <a class="js-transition nav__link nav__link-mobile" href="#">
            <FontAwesomeIcon className="" icon={faBars} />
          </a>
          <a class="js-transition nav__link nav__link-logo" href="/">
            <p class="nav__text">NL<br />NV</p>
          </a>
          <a class="js-transition nav__link" href="/about">
            <FontAwesomeIcon className="nav__icon" icon={faLeaf} />
            <p class="nav__text kor-main">교회소개</p>
          </a>
          <a class="js-transition nav__link" href="/series">
            <FontAwesomeIcon className="nav__icon" icon={faQuoteRight} />
            <p class="nav__text kor-main">설교영상</p>
          </a>
          <a class="js-transition nav__link" href="/news">
            <FontAwesomeIcon className="nav__icon" icon={faBullhorn} />
            <p class="nav__text kor-main">교회소식</p>
          </a>
          <a class="js-transition nav__link" href="/album">
            <FontAwesomeIcon className="nav__icon" icon={faCameraRetro} />
            <p class="nav__text kor-main">사진첩</p>
          </a>
          <a class="js-transition nav__link" href="/support">
            <FontAwesomeIcon className="nav__icon" icon={faHeart} />
            <p class="nav__text kor-main">협력/후원</p>
          </a>
          <a class="js-transition nav__link" href="/directions">
            <FontAwesomeIcon className="nav__icon" icon={faMapSigns} />
            <p class="nav__text kor-main">찾아오시는길</p>
          </a>

          <a class="nav__social" title="Facebook" href="https://www.facebook.com/pages/New-Life-New-Vision-Church/754157684605483" target="_blank">
            <FontAwesomeIcon className="nav__icon" icon={faFacebookSquare} />
            <i class="fa fa-facebook-square" aria-hidden="true"></i>
          </a>
          <a class="nav__social" title="YouTube" href="https://www.youtube.com/channel/UCdmLI5xDRzZmNVAch8HCyGg" target="_blank">
            <FontAwesomeIcon className="nav__icon" icon={faYoutube} />
            <i class="fa fa-youtube-play" aria-hidden="true"></i>
          </a>
        </nav>
      </>
    )}
  />
)

export default Navbar
