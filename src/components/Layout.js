import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Nav from './Nav'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './all.scss'

class TemplateWrapper extends Component {
  enter = () => {
    document.body.classList.add('loaded')
  }

  exit = () => {
    document.body.classList.remove('loaded')
  }

  render() {
    const { children } = this.props;

    this.enter()

    return (
      <>
        <Helmet title="New Life New Vision Church" />
        <Nav />
        <div class="nlnv__container">
          {children}
        </div>
        <div class="nlnv__container">
          <Footer />
        </div>
      </>
    )
  }
}

export default TemplateWrapper