import React, { Component } from 'react';
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

class BulletinCard extends Component {
  render() {
    const { bulletins } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          {bulletins.map(bulletin => {
            const singleBulletin = bulletin.node.acf;

            return (
              <div className="col-sm-3 col-xs-6 bulletin__card" key={`${singleBulletin.date}${singleBulletin.version}`}>
                <a href={singleBulletin.pdf_file.source_url} className="bulletin__card-img-wrap" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon className="bulletin__card-icon" icon={faDownload} />
                  <img className="bulletin__card-img" src={singleBulletin.poster.source_url} alt="" />
                </a>
                <p className="bulletin__card-title kor-main">{moment(singleBulletin.date).format('MMM DD, YYYY')}</p>
                <p className="bulletin__card-title kor-main">{singleBulletin.version}</p>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default BulletinCard;