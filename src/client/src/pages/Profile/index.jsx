import React, { useContext, useState, useEffect } from 'react';

import classNames from 'classnames';

import MoreIcon from 'assets/svg/icon-more.svg';
import TabHeader from 'components/Profile/TabHeader';
import { AuthContext } from 'contexts/Auth/authContext';
import useFetch from 'hooks/useFetch';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { parseJwt } from 'utils/token';
import EditProfile from 'components/Profile/EditProfile';
import { fullPathAPI } from 'utils/helpers';
import styles from './styles.module.scss';

const INIT_USER_INFO = {
  avatar: 'https://viblo.asia/images/mm.png',
};

function Profile() {
  const { userId } = useParams();
  const { token } = useContext(AuthContext);

  const follow = useFetch(`/user/${userId}/num_followers`, 0, (prev, _data) => _data.data);
  const following = useFetch(`/user/${userId}/num_followings`, 0, (prev, _data) => _data.data);
  const { username } = parseJwt(token);

  const { data } = useFetch(`/user/${userId}`, INIT_USER_INFO, (prev, _data) => _data.data);

  useEffect(() => {
    const html = document.querySelector('body');
    html.style.setProperty('background-color', '#f5f7fa');
  }, []);

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
              {data.username && (
                <>
                  <div className={styles.items}>
                    <h1 className={styles.name}>
                      <a href={`@/${data.username}`}>{`${data.first_name} ${data.last_name}` || data.username}</a>
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
                      <a href={`/@${data.username}`}>
                        @
                        {data.username}
                      </a>
                    </p>
                  </div>
                </>
              )}
              {username !== userId ? <Following follow={follow} /> : <EditProfile />}
              <div className={styles.stats}>
                <div>
                  <div className={styles.value}>{follow && follow.data}</div>
                  <div className={styles.text}>Followers</div>
                </div>
                <div>
                  <div className={styles.value}>{following && following.data}</div>
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
                    <div className={styles.content}>Lives in Ho Chi Minh City</div>
                  </li>
                  <li className={styles.item}>
                    <i className="icon icon-user_note" />
                    <div className={styles.content}>Works at BytesGo Inc</div>
                  </li>
                  <li className={styles.item}>
                    <i className="icon icon-topic_reading" />
                    <div className={styles.content}>Dump student in University of Science, HCMC</div>
                  </li>
                  <li className={styles.item}>
                    <i className="icon icon-location" />
                    <div className={styles.content}>From Bien Hoa, Dong Nai</div>
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
            <ProfileMain isAuthor={username === userId} />
          </div>
        </div>
        <div className={classNames(styles.right, styles.profileBg)} />
      </div>
    </div>
  );
}

function Following({ follow }) {
  const { token } = useContext(AuthContext);
  const { userId } = useParams();
  const { data, setData } = useFetch(`/user/${userId}/followed`, false, (prev, _data) => _data.data, {
    Authorization: `Bearer ${token}`,
  });

  const onClickFollowing = async () => {
    const postRes = await fetch(fullPathAPI('/user/follow'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followingUsername: userId,
      }),
    });

    const status = await postRes.json();

    if (status.message === 'successful') {
      setData(true);
      follow.setData((prev) => prev + 1);
    }
  };

  const onClickUnFollowing = async () => {
    const postRes = await fetch(fullPathAPI('/user/follow'), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followingUsername: userId,
      }),
    });

    const status = await postRes.json();

    if (status.message === 'successful') {
      setData(false);
      follow.setData((prev) => prev - 1);
    }
  };

  if (data) {
    return (

      <button className={styles.subscribeBtn} type="button" onClick={onClickUnFollowing}>
        <div className={styles.dump}>
          <span>Unfollow</span>
        </div>
      </button>
    );
  }
  return (
    <button className={styles.subscribeBtn} type="button" onClick={onClickFollowing}>
      <div className={styles.dump}>
        <span>Follow</span>
      </div>
    </button>
  );
}

function ProfileMain({ isAuthor }) {
  const [tab, setTab] = useState('stories');
  const [value, setValue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(tab);
  }, [tab]);

  return (
    <div id={styles.main}>
      <div className={styles.profileTabs}>
        <TabHeader name="Stories" icon="feed_posts" setTab={setTab} value="stories" tab={tab} count={value} />
        {/* <TabHeader name="Series" icon="tag" setTab={setTab} value="series" tab={tab} count={value} /> */}
        {isAuthor && <TabHeader name="Saved" icon="save_table" setTab={setTab} value="saved" tab={tab} count={value} />}
        <TabHeader name="Comments" icon="comment" setTab={setTab} value="comments" tab={tab} count={value} />
      </div>
      <Outlet context={[setValue]} />
    </div>
  );
}

export default Profile;
