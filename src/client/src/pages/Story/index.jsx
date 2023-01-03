import * as React from 'react';

import Spinner from 'components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { fullPathAPI, fullPathImage, thumbnailUrl } from 'utils/helpers';

import { AuthContext } from 'contexts/Auth/authContext';
import { abbreviateNumber, calculateMinsToRead, getDateMonthYear } from 'utils/calculate';
import { parseJwt } from 'utils/token';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import useFetch from '../../hooks/useFetch';

import styles from './styles.module.scss';

function Story() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { token } = React.useContext(AuthContext);
  const { username } = parseJwt(token);

  const { data } = useFetch(`/story/${slug}`, {}, (prev, content) => content.data);

  const post = data;

  const user = post.user?.data || {
    name: username,
    username,
    followers_count: 0,
    posts_count: 0,
  };

  React.useEffect(() => {
    const html = document.querySelector('html');
    html.style.setProperty('--featured-img', `url("${thumbnailUrl(post)}")`);
    html.style.setProperty('--bg-blend-mode', 'multiply');
    html.style.setProperty('background-size', '120% 2000px, 100% auto');
  }, [post]);

  return (
    <div className={styles.container}>
      <div className={styles.articlesAndSidebar}>
        <div className={styles.postCenter}>
          {post.contents ? (
            <>
              <div className={styles.leftSidePanel}>
                <div
                  className={styles.goBack}
                  onClick={() => {
                    navigate(-1);
                  }}
                  aria-hidden
                >
                  Go back
                </div>
                <div className={styles.smallerLeftSidePanel}>
                  <Vote token={token} storyId={slug} />
                  <button type="button" className={styles.bookmarkButton}>
                    <i className="icon icon-save_fill" />
                  </button>
                  <button type="button" className={styles.shareButton}>
                    <i className="icon icon-share_fill" />
                  </button>
                </div>
              </div>
              <div className={styles.contentContainer}>
                <div className={styles.header}>
                  <div className={styles.authorAvatar}>
                    <a href="/" className={styles.avatarAuthorProfileLink}>
                      {fullPathImage(post.user) ? (
                        <img src={fullPathImage(post.user)} alt="" className={styles.avatarAuthorImage} />
                      ) : (
                        <div>GAG</div>
                      )}
                    </a>
                  </div>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorPersonalInfo}>
                      <a href="/" className={styles.authorName}>
                        {user.name}
                      </a>
                      <span className={styles.authorUsername}>
                        @
                        {user.username}
                      </span>
                      <div>
                        <button type="button">Follow</button>
                      </div>
                    </div>
                    <div className={styles.authorCommunityInfo}>
                      <div>
                        <i className="icon icon-star_fill" />
                        <span>{user.reputation}</span>
                      </div>
                      <div>
                        <i className="icon icon-user_fill" />
                        <span>{user.followers_count}</span>
                      </div>
                      <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Write">
                          <path
                            d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                            fill="currentColor"
                          />
                          <path
                            d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                            stroke="currentColor"
                          />
                        </svg>
                        <span>{user.posts_count}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.postInfo}>
                    <div className={styles.postTimeInfo}>
                      {`Posted on ${getDateMonthYear(post.published_at)} - ${calculateMinsToRead(post.contents)} read`}
                    </div>
                    <div className={styles.postReputationInfo}>
                      <ViewCount token={token} storyId={slug} />
                      <div>
                        <i className="icon icon-comments" />
                        <span>{post.comments_count}</span>
                      </div>
                      <div>
                        <i className="icon icon-save_fill" />
                        <span>{post.clips_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h1>{post.title}</h1>
                <zero-md>
                  <script type="text/markdown">{post.contents}</script>
                </zero-md>
              </div>
            </>
          ) : (
            <Spinner className={styles.spinnerFull} />
          )}
        </div>
      </div>
      {/* <Sidebar /> */}
    </div>
  );
}

function Vote({ token, storyId }) {
  const [vote, setVote] = useState(0);

  const [typeVote, setTypeVoted] = useState(0);

  useEffect(() => {
    const getVoteData = async () => {
      const get = await fetch(fullPathAPI(`/story/${storyId}/vote`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await get.json();
      setVote(data.points);
      setTypeVoted(data.isVoted || -1);
    };
    getVoteData();
  }, []);

  const onClickUpVote = async () => {
    // const post = await fetch(fullPathAPI('/story/vote'), {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     // body : JSON.stringify({
    //     //   userId:
    //     // })
    //   },
    // });

    setTypeVoted((prev) => (prev === 1 ? 0 : 1));
  };

  const onClickDownVote = async () => {
    setTypeVoted((prev) => (prev === -1 ? 0 : -1));
  };

  return (
    <>
      <button type="button" className={styles.voteButton} onClick={onClickUpVote}>
        <i
          className={classNames(typeVote === 1 && styles.marked, 'icon icon-upvote_fill')}
          style={
          typeVote === 1
            ? {
              color: '#3b82f6',
            }
            : {}
        }
        />
      </button>
      <div
        className={classNames(typeVote !== 0 && styles.marked, styles.voteCount)}
        style={
          typeVote !== 0
            ? {
              color: typeVote === 1 ? '#3b82f6' : '#d946ef',
            }
            : {}
        }
      >
        {abbreviateNumber(vote + typeVote)}
      </div>
      <button type="button" className={styles.voteButton} onClick={onClickDownVote}>
        <i
          className={classNames(typeVote === -1 && styles.marked, 'icon icon-downvote_fill')}
          style={
            typeVote === -1
              ? {
                color: '#d946ef',
              }
              : {}
          }
        />
      </button>
    </>
  );
}

function ViewCount({ token, storyId }) {
  const { data } = useFetch(
    '/story/views',
    { storyId },
    (prev, _data) => _data,
    {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    'POST',
  );

  if (!data.view) {
    return null;
  }

  return (
    <div>
      <i className="icon icon-views" />
      <span>{data.view}</span>
    </div>
  );
}

export default Story;
