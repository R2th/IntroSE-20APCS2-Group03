import React, { useState } from 'react';

import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames';
import './styles.scss';

// eslint-disable-next-line
import { fullPathImage, thumbnailUrl } from 'utils/helpers';

function MediumCard({ content }) {
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();
  const onClickStory = () => {
    navigate(`story/${content.slug}`);
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
      </div>
      {content && (
        <div className={classNames('card-medium', isHover ? 'hover' : '')}>
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
                  <span>{content.reading_time}</span>
                  <span>mins read</span>
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
