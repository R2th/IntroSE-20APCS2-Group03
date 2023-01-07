import React, { useState } from 'react';

import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames';
import './small_hoz.style.scss';
import './small_verc.style.scss';
import './style.scss';

import { fullPathImage, thumbnailUrl } from 'utils/helpers';
import useFetch from 'hooks/useFetch';
import MediumCard from './CardMedium';

function Card({ content, type = 'fullWidth' }) {
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState(false);

  const { data } = useFetch(`user/${content.author_username}`, {}, (prev, _data) => _data.data);

  const onClickStory = () => {
    navigate(`/story/${content.id}`);
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
                      {data && (
                      <div className="name">
                        <span>
                          {data.username}
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
                        <span>{data.username}</span>
                      </div>
                      )}
                      <div className="time">
                        <div>{moment(content.createdAt).format('LL')}</div>
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
                        <div>{content.isPremium ? 'Premium Content' : ''}</div>
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
                <img alt="thumbnail" src={thumbnailUrl(content)} />
              </div>
            </>
          )}
        </div>
      );
    case 'medium':
      return <MediumCard content={content} />;

    case 'small-verc':
      return (
        <div className="small-verc-card" onClick={onClickStory} aria-hidden="true">
          <div className="thumbnail small-verc">
            <img alt="thumbnail" src={thumbnailUrl(content)} />
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
                  {data && (
                  <div className="name">
                    <span>
                      {data.username}
                      &nbsp;
                    </span>
                  </div>
                  )}
                  <div className="time">
                    <div>{moment(content.createdAt).format('LL')}</div>
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
          style={{ alignItems: 'center' }}
        >
          <div className="thumbnail small-hoz">
            <img alt="thumbnail" src={thumbnailUrl(content)} />
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
                  {data && (
                  <div className="name">
                    <span>
                      {data.username}
                      &nbsp;
                    </span>
                  </div>
                  )}
                  <div className="time">
                    <div>{moment(content.createdAt).format('LL')}</div>
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
