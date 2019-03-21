import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Nav from './Nav'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './all.scss'
import favicon from '../img/favicon.ico'

class TemplateWrapper extends Component {
  componentDidMount() {
    setTimeout(() => document.body.classList.add('loaded'), 250)
    const linkElem = document.querySelectorAll('.js-transition')

    Array.from(linkElem).forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const linkHref = link.getAttribute('href')
        document.body.classList.remove('loaded')
        setTimeout(() => {
          document.location.href = linkHref
        }, 500)
      });
    })
  }

  render() {
    const { children } = this.props

    return (
      <>
        <Helmet
          title="New Life New Vision Church"
          link={[
            { rel: 'shortcut icon', type: 'image/ico', href: `${favicon}` }
          ]}
        />
        <Nav />
        <div className="nlnv__container">
          {children}
        </div>
        <div className="nlnv__container">
          <Footer />
        </div>
      </>
    )
  }
}

export default TemplateWrapper