import * as React from 'react';

import { useParams, useNavigate } from 'react-router-dom';
// eslint-disable-next-line
import { fullPathImage, getDateMonthYear, thumbnailUrl, abbreviateNumber } from 'utils/helpers';
// eslint-disable-next-line
import Spinner from 'components/Spinner';
import useFetch from '../../hooks/useFetch';
import styles from './styles.module.scss';

function Story() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data } = useFetch(`/story/${slug}`, {}, (prev, content) => content.data);

  const post = data;

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
                  <button type="button" className={styles.voteButton}>
                    <i className="icon icon-upvote_fill" />
                  </button>
                  <div className={styles.voteCount}>
                    {abbreviateNumber(post.points)}
                  </div>
                  <button type="button" className={styles.voteButton}>
                    <i className="icon icon-downvote_fill" />
                  </button>
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
                      {fullPathImage(post.user) ? <img src={fullPathImage(post.user)} alt="" className={styles.avatarAuthorImage} /> : <div>GAG</div>}
                    </a>
                  </div>
                  <div className={styles.authorInfo}>
                    <div className={styles.authorPersonalInfo}>
                      <a href="/" className={styles.authorName}>{post.user.data.name}</a>
                      <span className={styles.authorUsername}>
                        @
                        {post.user.data.username}
                      </span>
                      <div>
                        <button type="button">Follow</button>
                      </div>
                    </div>
                    <div className={styles.authorCommunityInfo}>
                      <div>
                        <i className="icon icon-star_fill" />
                        <span>
                          {post.user.data.reputation}
                        </span>
                      </div>
                      <div>
                        <i className="icon icon-user_fill" />
                        <span>
                          {post.user.data.followers_count}
                        </span>
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
                        <span>
                          {post.user.data.posts_count}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.postInfo}>
                    <div className={styles.postTimeInfo}>
                      {`Posted on ${getDateMonthYear(post.published_at)} - ${post.reading_time} min read`}
                    </div>
                    <div className={styles.postReputationInfo}>
                      <div>
                        <i className="icon icon-views" />
                        <span>{post.views_count}</span>
                      </div>
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

export default Story;
