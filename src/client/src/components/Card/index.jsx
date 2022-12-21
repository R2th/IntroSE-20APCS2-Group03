import React, { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import './style.scss';
import './small_hoz.style.scss';
import './small_verc.style.scss';
import classNames from 'classnames';

// eslint-disable-next-line
import { fullPathImage, thumbnail_url } from 'utils/helpers';
import MediumCard from './CardMedium';

function Card({ content, type = 'fullWidth' }) {
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);

  const onClickStory = () => {
    navigate(`story/${content.slug}`);
  };

  switch (type) {
    case 'fullWidth':
      return (
        <div
          aria-hidden="true"
          className="card-container"
          onClick={onClickStory}
          onMouseMove={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          {content && (
            <>
              <div className="card-fullWidth">
                <div className="content">
                  <div className="header">
                    <img alt="avatar" className="avatar" src={fullPathImage(content.user)} />
                    <div className="title">
                      <div className="name">
                        <span>
                          {content.user && content.user.data.username}
                          &nbsp;
                        </span>
                        <span
                          style={{
                            color: '#959595',
                            fontSize: 14,
                          }}
                        >
                          in&nbsp;
                        </span>
                        <span>{content.user && content.user.data.name}</span>
                      </div>
                      <div className="time">
                        <div>{moment(content.published_at).format('LL')}</div>
                        <div
                          style={{
                            fontWeight: 'bold',
                            color: 'yellow',
                            textAlign: 'center',
                            textShadow:
                              '-0.5px 0 #000, --0.5px 0 #000, 0 -0.5px #000, 0 --0.5px #000,1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000 ',
                          }}
                        >
                          *
                        </div>
                        <div>{`${content.reading_time} mins read`}</div>
                      </div>
                    </div>
                  </div>
                  <div className="description">
                    <h3 className={classNames('title', isHover ? 'hover' : '')}>{content.title}</h3>
                    <div className="contents_short">{content.contents_short}</div>
                  </div>
                </div>
              </div>
              <div className="thumbnail">
                <img alt="thumbnail" src={thumbnail_url(content)} />
              </div>
            </>
          )}
        </div>
      );
    case 'medium':
      return <MediumCard content={content} />;

    case 'small-verc':
      return (
        <div className="card-container small-verc-card" onClick={onClickStory} aria-hidden="true">
          <div className="thumbnail small-verc">
            <img alt="thumbnail" src={thumbnail_url(content)} />
          </div>
          {content && (
            <div className="card-small-verc">
              <div className="description">
                <h3 className={classNames('title', isHover ? 'hover' : '')}>{content.title}</h3>
                <p className="contents_short">{content.contents_short}</p>
              </div>
              <div className="footer">
                <img alt="avatar" className="avatar" src={fullPathImage(content.user)} />
                <div className="title">
                  <div className="name">
                    <span>
                      {content.user && content.user.data.username}
                      &nbsp;
                    </span>
                  </div>
                  <div className="time">
                    <div>{moment(content.published_at).format('LL')}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    case 'small-hoz':
      return (
        <div
          className="card-container small-hoz-card"
          onClick={onClickStory}
          onMouseMove={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          aria-hidden="true"
        >
          <div className="thumbnail small-hoz">
            <img alt="thumbnail" src={thumbnail_url(content)} />
          </div>
          {content && (
            <div className="card-small-hoz">
              <div className="description">
                <h3 className={classNames('title', isHover ? 'hover' : '')}>{content.title}</h3>
                <p className="contents_short">{content.contents_short}</p>
              </div>
              <div className="footer">
                <img alt="avatar" className="avatar" src={fullPathImage(content.user)} />
                <div className="title">
                  <div className="name">
                    <span>
                      {content.user && content.user.data.username}
                      &nbsp;
                    </span>
                  </div>
                  <div className="time">
                    <div>{moment(content.published_at).format('LL')}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}

export default Card;
