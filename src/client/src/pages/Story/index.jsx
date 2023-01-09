import * as React from 'react';

import Spinner from 'components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { fullPathAPI, fullPathImage, thumbnailUrl } from 'utils/helpers';

import CommentSystem from 'components/Comments/CommentSystem';
import SavedList from 'components/Story/Saved';
import Vote from 'components/Story/Vote';
import { AuthContext } from 'contexts/Auth/authContext';
import { CommentProvider } from 'contexts/CommentContext';
import { useState } from 'react';
import { calculateMinsToRead, getDateMonthYear } from 'utils/calculate';
import Toast from 'components/Toast/Toast';
import TOAST_PROPERTIES from 'components/Toast/toastProperties';
import Footer from 'components/Footer/Footer';
import useFetch from '../../hooks/useFetch';

import styles from './styles.module.scss';

function Story() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [author, setAuthor] = useState(null);
  const [toastProps, setToastProps] = useState([]);
  const toastAutoDelete = true;

  const { token } = React.useContext(AuthContext);

  // const contentPreview = useFetch(`story/${slug}/contents/0/200`, { contents: '' }, (prev, data) => data.data, {
  //   Authorization: `Bearer ${token}`,
  // });

  const contentFull = useFetch(`story/${slug}/contents/full`, { contents: '' }, (prev, data) => data.data, {
    Authorization: `Bearer ${token}`,
  });

  const othersData = useFetch(`story/${slug}/other-data`, {}, (prev, data) => data.data);

  // const checkFull = () => {
  //   if (contentFull.data.message) {
  //     return 'no permission';
  //   }
  //   if (contentFull.data.contents) {
  //     return contentFull.data.contents || 'no contents';
  //   }
  //   if (contentPreview.data.contents) {
  //     return contentPreview.data.contents || 'no contents';
  //   }
  //   return '';
  // };

  const post = contentFull.data;
  const others = othersData.data;

  React.useEffect(() => {
    if (!others.author_username) {
      return;
    }
    // eslint-disable-next-line
    const { author_username } = others;

    // eslint-disable-next-line
    if (!author_username) return;

    const getAuthor = async () => {
      // eslint-disable-next-line
      const getRes = await fetch(fullPathAPI(`user/${author_username}`));
      const { data } = await getRes.json();
      setAuthor(data);
    };

    getAuthor();

    const html = document.querySelector('html');
    html.style.setProperty('--featured-img', `url("${thumbnailUrl(othersData.data)}")`);
    html.style.setProperty('--bg-blend-mode', 'multiply');
    html.style.setProperty('background-size', '120% 2000px, 100% auto');
  }, [others]);

  const showToast = (type) => {
    const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title === type);
    setToastProps([...toastProps, toastProperties]);
  };

  const copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(
      () => {
        showToast('Success');
      },
      () => {
        showToast('Error');
      },
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.articlesAndSidebar}>
          <div className={styles.postCenter}>
            {othersData && post && post.contents ? (
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
                    <SavedList />
                    <button
                      type="button"
                      className={styles.shareButton}
                      onClick={() => {
                        copyTextToClipboard(window.location.href);
                      }}
                    >
                      <i className="icon icon-share_fill" />
                    </button>
                  </div>
                </div>
                <div className={styles.contentContainer}>
                  <div className={styles.header}>
                    {author && (
                      <div className={styles.authorAvatar}>
                        <a href={`/@${author.username}`} className={styles.avatarAuthorProfileLink}>
                          {fullPathImage(author.avatar) ? (
                            <img src={fullPathImage(author.avatar)} alt="" className={styles.avatarAuthorImage} />
                          ) : (
                            <div>GAG</div>
                          )}
                        </a>
                      </div>
                    )}
                    {author && (
                      <div className={styles.authorInfo}>
                        <div className={styles.authorPersonalInfo}>
                          <a href={`/@${author.username}`} className={styles.authorName}>
                            {`${author.first_name} ${author.last_name}` || author.username}
                          </a>
                          <span className={styles.authorUsername}>
                            @
                            {author.username}
                          </span>
                          <div>
                            <button type="button">Follow</button>
                          </div>
                        </div>
                        <div className={styles.authorCommunityInfo}>
                          <div>
                            <i className="icon icon-star_fill" />
                            <span>{author.reputation}</span>
                          </div>
                          <div>
                            <i className="icon icon-user_fill" />
                            <span>{author.followers_count}</span>
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
                            <span>{author.posts_count}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className={styles.postInfo}>
                      <div className={styles.postTimeInfo}>
                        {/* {others.createdAt !== others.updatedAt ? `Updated at ${getDateMonthYear(post.createdAt)} - ${calculateMinsToRead(post.contents)} read`
                        : `Posted on ${getDateMonthYear(post.createdAt)} - ${calculateMinsToRead(post.contents)} read`} */}
                        {`Posted on ${getDateMonthYear(others.createdAt)} - ${calculateMinsToRead(post.contents)} read`}
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
                  <div className={styles.articleTitle}>
                    <h1>{others.title}</h1>
                  </div>
                  <zero-md>
                    <script type="text/markdown">{post.contents}</script>
                  </zero-md>
                  <CommentProvider>
                    <CommentSystem />
                  </CommentProvider>
                </div>
              </>
            ) : (
              <Spinner className={styles.spinnerFull} />
            )}
          </div>
        </div>
        <Toast toastList={toastProps} position="bottom-left" autoDelete={toastAutoDelete} autoDeleteTime={3000} />
        {/* <Sidebar /> */}
      </div>
      <Footer />
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
