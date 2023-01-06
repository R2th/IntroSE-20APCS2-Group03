import React, { useContext, useState } from 'react';

import classNames from 'classnames';

import MoreIcon from 'assets/svg/icon-more.svg';
import useFetch from 'hooks/useFetch';
import { INIT_DATA_CONTENT } from 'utils/const';
import Card from 'components/Card';
import { AuthContext } from 'contexts/Auth/authContext';
import { useParams } from 'react-router-dom';
import { parseJwt } from 'utils/token';
import styles from './styles.module.scss';

const INIT_USER_INFO = {
  avatar: 'https://viblo.asia/images/mm.png',
};

function Profile() {
  const { userId } = useParams();
  const { token } = useContext(AuthContext);

  const { username } = parseJwt(token);
  const { data } = useFetch(`/user/${username}`, INIT_USER_INFO, (prev, _data) => _data.data);

  const renderSidebar = () => (
    <div className={styles.profileInfo}>
      <div className={styles.dynamicSidebar}>
        <div className={styles.widget}>
          <div className={styles.body}>
            <div className={styles.basic}>
              <div className={styles.avatarContainer}>
                <div className={styles.avatar}>
                  <a href="/user-id">
                    <img loading="lazy" src="https://viblo.asia/images/mm.png" alt="samurice" />
                  </a>
                </div>
              </div>
              <div className={styles.items}>
                <h1 className={styles.name}>
                  <a href={`/${username}`}>
                    {`${data.first_name} ${data.last_name}` || data.username}
                  </a>
                </h1>
                <i className="icon icon-chat" />
                <div>
                  <div className={styles.more}>
                    <img alt="More" src={MoreIcon} />
                  </div>
                </div>
              </div>
              <div className={styles.tns}>
                <p>
                  <a href={`/${username}`}>
                    @
                    {username}
                  </a>
                </p>
              </div>
              {username !== userId ? (
                <button className={styles.subscribeBtn} type="button">
                  <div className={styles.dump}>
                    <span>Follow</span>
                  </div>
                </button>
              )
                : <button type="button" className={styles.editProfile}>Edit profile</button>}
              <div className={styles.stats}>
                <div>
                  <div className={styles.value}>112323</div>
                  <div className={styles.text}>Followers</div>
                </div>
                <div>
                  <div className={styles.value}>123</div>
                  <div className={styles.text}>Following</div>
                </div>
                <div>
                  <div className={styles.value}>3323</div>
                  <div className={styles.text}>Upvotes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bio}>{data.bio}</div>
        <div>
          <div className={styles.intro}>
            <div className={styles.body}>
              <div className={styles.about}>
                <ul>
                  <li className={styles.item}>
                    <i className="icon icon-home" />
                    <div className={styles.content}>
                      Lives in Ho Chi Minh City
                    </div>
                  </li>
                  <li className={styles.item}>
                    <i className="icon icon-user_note" />
                    <div className={styles.content}>
                      Works at BytesGo Inc
                    </div>
                  </li>
                  <li className={styles.item}>
                    <i className="icon icon-topic_reading" />
                    <div className={styles.content}>
                      Dump student in University of Science, HCMC
                    </div>
                  </li>
                  <li className={styles.item}>
                    <i className="icon icon-location" />
                    <div className={styles.content}>
                      From Bien Hoa, Dong Nai
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.othersContact}>
          <ul>
            {/* {data.contacts && data.contacts.map((contacts) =>
            <li className={styles.list}>
              <a href="https://fb.com">
                <span className={styles.icon}>
                  <i className="fa fa-facebook" />
                </span>
              </a>
            </li>
              )} */}
            <li className={styles.list}>
              <a href={`mailto:${data.email}`}>
                <span className={styles.icon}>
                  <i className="icon icon-mod_mail" />
                </span>
              </a>
            </li>
            {/* <li className={styles.list}>
              <a href="https://fb.com">
                <span className={styles.icon}>
                  <i className="fa fa-youtube" />
                </span>
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <nav className={styles.navbar} />
      <div className={styles.userProfile}>
        <div className={classNames(styles.left, styles.profileBg)} />
        <div className={styles.container}>
          <div className={styles.profile}>
            {renderSidebar()}
            <ProfileMain />
          </div>
        </div>
        <div className={classNames(styles.right, styles.profileBg)} />
      </div>
    </div>
  );
}

function ProfileMain() {
  const [tab, setTab] = useState('stories');
  const { token } = useContext(AuthContext);

  const { username } = parseJwt(token);

  const { data } = useFetch(`/story/author/${username}`, INIT_DATA_CONTENT, (prev, _data) => {
    if (prev === INIT_DATA_CONTENT) {
      return _data.data;
    }
    return [...Array.from(new Set([...prev, _data.data]))];
  }, {
    Authorization: `Bearer ${token}`,
  });

  const renderStoriesTab = () => (
    <div className={styles.postsTab}>
      <div className={styles.controlLayout} />
      <div className={styles.filter}>
        <div>
          <i
            className="icon icon-new_fill"
            style={{
              color: '#0079d3',
            }}
          />
          <span className="">New</span>
        </div>
        <div>
          <i
            className="icon icon-hot_fill"
            style={{
              color: 'orangered',
            }}
          />
          <span className="">Hot</span>
        </div>
        <div>
          <i
            className="icon icon-top_fill"
          />
          <span className="">Top</span>
        </div>
      </div>
      <div className={styles.body}>
        {data.map((content) => <Card key={content.id} content={content} type="small-verc" />)}
      </div>
    </div>
  );
  const renderSeriesTab = () => <div className={styles.postsTab} />;
  const renderCommentsTab = () => <div className={styles.postsTab} />;

  return (
    <div id={styles.main}>
      <div className={styles.profileTabs}>
        <TabHeader name={`Stories (${data.length})`} icon="feed_posts" setTab={setTab} value="stories" tab={tab} />
        <TabHeader name="Series" icon="tag" setTab={setTab} value="series" tab={tab} />
        <TabHeader name="Comments" icon="comment" setTab={setTab} value="comments" tab={tab} />
      </div>
      {tab === 'stories' && renderStoriesTab()}
      {tab === 'series' && renderSeriesTab()}
      {tab === 'comments' && renderCommentsTab()}
    </div>
  );
}

function TabHeader({
  name, icon, value, setTab, tab,
}) {
  const onSelectTab = () => {
    setTab(value);
  };
  return (
    <div
      className={styles.item}
      onClick={onSelectTab}
      aria-hidden
      style={tab === value ? {
        borderBottom: ' 2px solid #3398d4',
        color: 'black',
      } : {}}
    >
      <i className={`icon icon-${icon}`} />
      <span>{name}</span>
    </div>
  );
}

export default Profile;
