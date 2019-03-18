import React, { Component } from 'react'
import Popup from "reactjs-popup"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class NewsCard extends Component {
  render() {
    const { news } = this.props;

    return news.map(singleNews => {
      const currentNews = singleNews.node.acf;

      return (
        <div className="card__col col-sm-6 col-md-4" key={`newsCard-${singleNews.node.id}`}>
          <div className="card__container">
            <div className="card__thumbnail">
              <div className="card__image" style={{backgroundImage: `url(${currentNews.nlnv_news_image.source_url})`}} />
            </div>
            <div className="card__content">
              <div className="card__category">{currentNews.nlnv_news_date}</div>
              <h1 className="card__title kor-main">{currentNews.nlnv_news_title}</h1>
              <h2 className="card__subtitle">{currentNews.nlnv_news_subtitle}</h2>
              <div className="card__description">
                <p className="kor-main">자세히보기를 클릭</p>
              </div>
              <div className="card__cta">
                <Popup
                  trigger={
                    <div className="card__btn kor-main"><FontAwesomeIcon icon={faSearch} /> 자세히보기</div>
                  }
                  modal
                  closeOnDocumentClick
                >
                  <div className="white-popup">
                    <h2 className="nlnv__heading margin-top-xs kor-main">{currentNews.nlnv_news_title}</h2>
                    <img className="margin-top-md margin-bottom-md" src={currentNews.nlnv_news_image.source_url} alt="" />
                    <h4 className="kor-main text-bold text-line-height-15">{currentNews.nlnv_news_subtitle}</h4>
                    <div className="white-popup__content margin-top-sm margin-bottom-md text-line-height-15 kor-main" dangerouslySetInnerHTML={{__html: currentNews.nlnv_news_details.replace(/(<? *script)/gi, 'illegalscript')}} />
                  </div>
                </Popup>
              </div>
            </div>
          </div>
        </div>
      )
    });
  }
}

export default NewsCard;