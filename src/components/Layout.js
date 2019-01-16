import React, { Component } from 'react'
import Helmet from 'react-helmet'
import Nav from './Nav'
import Footer from './Footer'
import 'bootstrap/dist/css/bootstrap.min.css'
import './all.scss'

class TemplateWrapper extends Component {
  componentDidMount() {
    document.body.classList.add('loaded')
  }

  componentWillUnmount() {
    document.body.classList.remove('loaded')
  }

  render() {
    const { children } = this.props

    return (
      <>
        <Helmet title="New Life New Vision Church" />
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