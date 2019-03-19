import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandshake, faChild, faGlobe, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

class AboutPage extends Component {
  state = {
    activeTab: 1,
    staffActiveCount: 0
  }

  componentDidMount() {
    const { acf: { nlnv_about_tabs } } = this.props;

    let staffActiveNumber = 0;

    for(let x = 1; x < 5; x++) {
      const activeStatus = nlnv_about_tabs[`nlnv_about_staff_${x}`]['nlnv_staff_active'];
      if (activeStatus) staffActiveNumber++;
    }

    this.setState({ staffActiveCount: staffActiveNumber });
  }

  handleTabClick = (tab) => {
    document.querySelector('html, body').animate({
      scrollTop: document.querySelector('.about__tab-contents').top
    }, 500);
    this.setState({ activeTab: tab });
  }

  render() {
    const { activeTab, staffActiveCount } = this.state;
    const { acf: { nlnv_page_title, nlnv_hero_image, nlnv_about_tabs, nlnv_about_service_grid } } = this.props;

    return (
      <>
        <div className="about__banner text-center" style={{ backgroundImage: `url(${nlnv_hero_image.source_url})` }}>
          <h1 className="nlnv__heading kor-main">{nlnv_page_title}</h1>
          <hr className="divider divider--blue" />
        </div>
        <div className="about__tab-section">
          <ul className="about__tab-lists">
            <li className={`about__tab-list kor-main ${activeTab === 1 ? 'active' : ''}`} onClick={() => { this.handleTabClick(1) }}>{nlnv_about_tabs.nlnv_about_tab_1_title}</li>
            <li className={`about__tab-list kor-main ${activeTab === 2 ? 'active' : ''}`} onClick={() => { this.handleTabClick(2) }}>{nlnv_about_tabs.nlnv_about_tab_2_title}</li>
            <li className={`about__tab-list kor-main ${activeTab === 3 ? 'active' : ''}`} onClick={() => { this.handleTabClick(3) }}>{nlnv_about_tabs.nlnv_about_tab_3_title}</li>
          </ul>
          <ul className="about__tab-contents">
            <li className={`about__tab-content about__tab-content--vision ${activeTab === 1 ? 'active' : ''}`}>
              <div className="about__tab-content-wrapper kor-main">
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <p className="nlnv__subheading divider--wrap text--gold">{nlnv_about_tabs.nlnv_about_main_vision}</p>
                    <FontAwesomeIcon className="about__vision-icon fa" icon={faHandshake} />
                    <div dangerouslySetInnerHTML={{ __html: nlnv_about_tabs.nlnv_about_vision_1 }} />
                    <hr className="divider" />
                    <FontAwesomeIcon className="about__vision-icon fa" icon={faChild} />
                    <div dangerouslySetInnerHTML={{ __html: nlnv_about_tabs.nlnv_about_vision_2 }} />
                    <hr className="divider" />
                    <FontAwesomeIcon className="about__vision-icon fa" icon={faGlobe} />
                    <div dangerouslySetInnerHTML={{ __html: nlnv_about_tabs.nlnv_about_vision_3 }} />
                    <hr className="divider" />
                  </div>
                </div>
              </div>
            </li>
            <li className={`about__tab-content about__tab-content--pastor ${activeTab === 2 ? 'active' : ''}`}>
              <div className="about__tab-content-wrapper kor-main">
                <div className="row">
                  <div className="col-md-6 offset-md-3">
                    <img className="about__tab-image margin-bottom-xl" src={nlnv_about_tabs.nlnv_about_introduction_photo.source_url} alt="" />
                  </div>
                  <div className="col-md-6 offset-md-3">
                    <p className="nlnv__subheading divider--wrap text--gold">{nlnv_about_tabs.nlnv_about_introduction_title}</p>
                    <div className="about__tab-introduction" dangerouslySetInnerHTML={{ __html: nlnv_about_tabs.nlnv_about_introduction }} />
                    <p className="nlnv__subheading divider--wrap text--gold margin-top-xl">{nlnv_about_tabs.nlnv_about_resume_title}</p>
                    <div dangerouslySetInnerHTML={{ __html: nlnv_about_tabs.nlnv_about_resume }} />
                  </div>
                </div>
              </div>
            </li>
            <li className={`about__tab-content about__tab-content--leader ${activeTab === 3 ? 'active' : ''}`}>
              <div className="about__tab-content-wrapper kor-main">
                <div className="container-fluid">
                  <div className="row">
                    <div className={`col-md-${12 / staffActiveCount}`}>
                      <img className="about__tab-image" src={nlnv_about_tabs.nlnv_about_staff_1.nlnv_about_staff_photo.source_url} alt="" />
                      <p className="nlnv__subheading divider--wrap text--gold margin-top-sm">{nlnv_about_tabs.nlnv_about_staff_1.nlnv_about_staff_title}</p>
                      <div className="about__tab-introduction margin-bottom-lg-max-desktop">
                        <p>{nlnv_about_tabs.nlnv_about_staff_1.nlnv_about_staff_name}</p>
                        <a className="about__tab-icon text-link margin-right-sm" href={`mailto:${nlnv_about_tabs.nlnv_about_staff_1.nlnv_about_staff_email}`}><FontAwesomeIcon icon={faEnvelope} /></a>
                        {nlnv_about_tabs.nlnv_about_staff_1.nlnv_about_staff_phone !== '' && <a className="about__tab-icon text-link" href={`tel:${nlnv_about_tabs.nlnv_about_staff_1.nlnv_about_staff_phone}`}><FontAwesomeIcon icon={faPhone} /></a>}
                      </div>
                    </div>
                    <div className={`col-md-${12 / staffActiveCount}`}>
                      <img className="about__tab-image" src={nlnv_about_tabs.nlnv_about_staff_2.nlnv_about_staff_photo.source_url} alt="" />
                      <p className="nlnv__subheading divider--wrap text--gold margin-top-sm">{nlnv_about_tabs.nlnv_about_staff_2.nlnv_about_staff_title}</p>
                      <div className="about__tab-introduction margin-bottom-lg-max-desktop">
                        <p>{nlnv_about_tabs.nlnv_about_staff_2.nlnv_about_staff_name}</p>
                        <a className="about__tab-icon text-link" href={`mailto:${nlnv_about_tabs.nlnv_about_staff_2.nlnv_about_staff_email}`}><FontAwesomeIcon icon={faEnvelope} /></a>
                        {nlnv_about_tabs.nlnv_about_staff_2.nlnv_about_staff_phone !== '' && <a className="about__tab-icon text-link" href={`tel:${nlnv_about_tabs.nlnv_about_staff_2.nlnv_about_staff_phone}`}><FontAwesomeIcon icon={faPhone} /></a>}
                      </div>
                    </div>
                    <div className={`col-md-${12 / staffActiveCount}`}>
                      <img className="about__tab-image" src={nlnv_about_tabs.nlnv_about_staff_3.nlnv_about_staff_photo.source_url} alt="" />
                      <p className="nlnv__subheading divider--wrap text--gold margin-top-sm">{nlnv_about_tabs.nlnv_about_staff_3.nlnv_about_staff_title}</p>
                      <div className="about__tab-introduction margin-bottom-lg-max-desktop">
                        <p>{nlnv_about_tabs.nlnv_about_staff_3.nlnv_about_staff_name}</p>
                        <a className="about__tab-icon text-link" href={`mailto:${nlnv_about_tabs.nlnv_about_staff_3.nlnv_about_staff_email}`}><FontAwesomeIcon icon={faEnvelope} /></a>
                        {nlnv_about_tabs.nlnv_about_staff_3.nlnv_about_staff_phone !== '' && <a className="about__tab-icon text-link" href={`tel:${nlnv_about_tabs.nlnv_about_staff_3.nlnv_about_staff_phone}`}><FontAwesomeIcon icon={faPhone} /></a>}
                      </div>
                    </div>
                    <div className={`col-md-${12 / staffActiveCount}`}>
                      <img className="about__tab-image" src={nlnv_about_tabs.nlnv_about_staff_4.nlnv_about_staff_photo.source_url} alt="" />
                      <p className="nlnv__subheading divider--wrap text--gold margin-top-sm">{nlnv_about_tabs.nlnv_about_staff_4.nlnv_about_staff_title}</p>
                      <div className="about__tab-introduction">
                        <p>{nlnv_about_tabs.nlnv_about_staff_4.nlnv_about_staff_name}</p>
                        <a className="about__tab-icon text-link" href={`mailto:${nlnv_about_tabs.nlnv_about_staff_4.nlnv_about_staff_email}`}><FontAwesomeIcon icon={faEnvelope} /></a>
                        {nlnv_about_tabs.nlnv_about_staff_4.nlnv_about_staff_phone !== '' && <a className="about__tab-icon text-link" href={`tel:${nlnv_about_tabs.nlnv_about_staff_4.nlnv_about_staff_phone}`}><FontAwesomeIcon icon={faPhone} /></a>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="about__card-container">
          <div className="row">
            <div className="col-md-4 col-sm-6 about__card about__card--leader" style={{ backgroundImage: `url(${nlnv_about_service_grid.nlnv_about_service_grid_1.nlnv_about_service_image.source_url})` }}>
              <h3 className="nlnv__heading--sm kor-main">{nlnv_about_service_grid.nlnv_about_service_grid_1.nlnv_about_service_title}</h3>
              <hr className="divider divider--blue" />
              <div className="about__card-info kor-main text-center" dangerouslySetInnerHTML={{ __html: nlnv_about_service_grid.nlnv_about_service_grid_1.nlnv_about_service_details }} />
            </div>
            <div className="col-md-4 col-sm-6 about__card about__card--faith" style={{ backgroundImage: `url(${nlnv_about_service_grid.nlnv_about_service_grid_2.nlnv_about_service_image.source_url})` }}>
              <h3 className="nlnv__heading--sm kor-main">{nlnv_about_service_grid.nlnv_about_service_grid_2.nlnv_about_service_title}</h3>
              <hr className="divider divider--blue" />
              <div className="about__card-info kor-main text-center" dangerouslySetInnerHTML={{ __html: nlnv_about_service_grid.nlnv_about_service_grid_2.nlnv_about_service_details }} />
            </div>
            <div className="col-md-4 col-sm-6 about__card about__card--disciple" style={{ backgroundImage: `url(${nlnv_about_service_grid.nlnv_about_service_grid_3.nlnv_about_service_image.source_url})` }}>
              <h3 className="nlnv__heading--sm kor-main">{nlnv_about_service_grid.nlnv_about_service_grid_3.nlnv_about_service_title}</h3>
              <hr className="divider divider--blue" />
              <div className="about__card-info kor-main text-center" dangerouslySetInnerHTML={{ __html: nlnv_about_service_grid.nlnv_about_service_grid_3.nlnv_about_service_details }} />
            </div>
            <div className="col-md-4 col-sm-6 about__card about__card--bible" style={{ backgroundImage: `url(${nlnv_about_service_grid.nlnv_about_service_grid_4.nlnv_about_service_image.source_url})` }}>
              <h3 className="nlnv__heading--sm kor-main">{nlnv_about_service_grid.nlnv_about_service_grid_4.nlnv_about_service_title}</h3>
              <hr className="divider divider--blue" />
              <div className="about__card-info kor-main text-center" dangerouslySetInnerHTML={{ __html: nlnv_about_service_grid.nlnv_about_service_grid_4.nlnv_about_service_details }} />
            </div>
            <div className="col-md-4 col-sm-6 about__card about__card--pray" style={{ backgroundImage: `url(${nlnv_about_service_grid.nlnv_about_service_grid_5.nlnv_about_service_image.source_url})` }}>
              <h3 className="nlnv__heading--sm kor-main">{nlnv_about_service_grid.nlnv_about_service_grid_5.nlnv_about_service_title}</h3>
              <hr className="divider divider--blue" />
              <div className="about__card-info kor-main text-center" dangerouslySetInnerHTML={{ __html: nlnv_about_service_grid.nlnv_about_service_grid_5.nlnv_about_service_details }} />
            </div>
            <div className="col-md-4 col-sm-6 about__card about__card--school" style={{ backgroundImage: `url(${nlnv_about_service_grid.nlnv_about_service_grid_6.nlnv_about_service_image.source_url})` }}>
              <h3 className="nlnv__heading--sm kor-main">{nlnv_about_service_grid.nlnv_about_service_grid_6.nlnv_about_service_title}</h3>
              <hr className="divider divider--blue" />
              <div className="about__card-info kor-main text-center" dangerouslySetInnerHTML={{ __html: nlnv_about_service_grid.nlnv_about_service_grid_6.nlnv_about_service_details }} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

AboutPage.propTypes = {
  acf: PropTypes.object
}

const Page = ({ data }) => {
  const { wordpressPage: page } = data

  return (
    <Layout>
      <AboutPage acf={page.acf} />
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query AboutPage($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      acf {
        nlnv_page_title
        nlnv_hero_image {
          source_url
        }
        nlnv_about_tabs {
          nlnv_about_tab_1_title
          nlnv_about_main_vision
          nlnv_about_vision_1
          nlnv_about_vision_2
          nlnv_about_vision_3
          nlnv_about_tab_2_title
          nlnv_about_introduction_title
          nlnv_about_introduction
          nlnv_about_introduction_photo {
            source_url
          }
          nlnv_about_resume_title
          nlnv_about_resume
          nlnv_about_tab_3_title
          nlnv_about_staff_1 {
            nlnv_staff_active
            nlnv_about_staff_title
            nlnv_about_staff_name
            nlnv_about_staff_email
            nlnv_about_staff_phone
            nlnv_about_staff_photo {
              source_url
            }
          }
          nlnv_about_staff_2 {
            nlnv_staff_active
            nlnv_about_staff_title
            nlnv_about_staff_name
            nlnv_about_staff_email
            nlnv_about_staff_phone
            nlnv_about_staff_photo {
              source_url
            }
          }
          nlnv_about_staff_3 {
            nlnv_staff_active
            nlnv_about_staff_title
            nlnv_about_staff_name
            nlnv_about_staff_email
            nlnv_about_staff_phone
            nlnv_about_staff_photo {
              source_url
            }
          }
          nlnv_about_staff_4 {
            nlnv_staff_active
            nlnv_about_staff_title
            nlnv_about_staff_name
            nlnv_about_staff_email
            nlnv_about_staff_phone
            nlnv_about_staff_photo {
              source_url
            }
          }
        }
        nlnv_about_service_grid {
          nlnv_about_service_grid_1 {
            nlnv_about_service_title
            nlnv_about_service_details
            nlnv_about_service_image {
              source_url
            }
          }
          nlnv_about_service_grid_2 {
            nlnv_about_service_title
            nlnv_about_service_details
            nlnv_about_service_image {
              source_url
            }
          }
          nlnv_about_service_grid_3 {
            nlnv_about_service_title
            nlnv_about_service_details
            nlnv_about_service_image {
              source_url
            }
          }
          nlnv_about_service_grid_4 {
            nlnv_about_service_title
            nlnv_about_service_details
            nlnv_about_service_image {
              source_url
            }
          }
          nlnv_about_service_grid_5 {
            nlnv_about_service_title
            nlnv_about_service_details
            nlnv_about_service_image {
              source_url
            }
          }
          nlnv_about_service_grid_6 {
            nlnv_about_service_title
            nlnv_about_service_details
            nlnv_about_service_image {
              source_url
            }
          }
        }
      }
    }
  }
`
