import React, { useState } from 'react';

import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames';
import './styles.scss';

import { fullPathImage, thumbnailUrl } from 'utils/helpers';
import useFetch from 'hooks/useFetch';

function MediumCard({ content }) {
  const [isHover, setIsHover] = useState(false);
  const { data } = useFetch(`user/${content.author_username}`, {}, (prev, _data) => _data.data);

  const navigate = useNavigate();
  const onClickStory = () => {
    navigate(`story/${content.id}`);
  };

  return (
    <div
      aria-hidden="true"
      className="card-container medium-card"
      onClick={onClickStory}
      onMouseMove={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className={classNames('thumbnail', 'medium', isHover ? 'hover' : '')}>
        <img alt="thumbnail" src={thumbnailUrl(content)} />
        <div className="description">
          <h3 className={classNames('title', isHover ? 'hover' : '')}>{content.title}</h3>
          <p className="contents_short">{content.contents_short}</p>
        </div>
      </div>
      {content && (
        <div className={classNames('card-medium', isHover ? 'hover' : '')}>

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
                <div>
                  <span>{content.isPremium ? 'Premium Content' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MediumCard;
