import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from 'assets/svg/logo.svg';
import { md5 } from 'utils/md5';
import { AuthContext } from 'contexts/Auth/authContext';
import { parseJwt } from 'utils/token';
import Search from 'components/Search';
import Menu from '../Menu';
import styles from './styles.module.scss';
import UserDropdownMenu from './userMenu';
import NotificationPopUp from './Notification/notification';

function Navbar() {
  const location = useLocation();
  if (location.pathname.startsWith('/auth')) return null;

  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const onCreateNewStory = () => {
    const { username } = parseJwt(token);
    const s = username + Date.now().toString();
    navigate(`/story/${md5(s)}/edit`);
  };

  return (
    <header className={styles.mainNavBar}>
      <div className={styles.container} id="nav-bar">
        <div
          className={styles.left}
          // style={prefix > 0 ? { width: prefix } : {}}
        >
          <a aria-label="Home" className={styles.homeBtn} href="/">
            <img
              alt="BytesGo"
              src={Logo}
              style={{
                width: 20,
              }}
            />
            <span className={styles.logo}>BytesGo</span>
          </a>
        </div>
        <div className={styles.center}>
          <Menu />
          <Search />
          <div className={styles.icGroup}>
            <span className={styles.icTrending}>
              <a href="/story/trending" aria-label="Trending">
                <i className="icon icon-popular" />
              </a>
            </span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.icGroup}>
            <span className={styles.icAdd} onClick={onCreateNewStory} aria-hidden>
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
              <span>Write</span>
            </span>
            <div style={{ textDecoration: 'none' }} onClick={() => navigate('premium')} type="button" aria-hidden>
              <span className={styles.upgrade}>
                <i className="icon icon-topic_activism" style={{ color: '#fff' }} />
                <span>Unlimited Access</span>
              </span>
            </div>
            {token && (
            <>
              <span className={styles.icChat}>
                <i className="icon icon-chat" />
              </span>
              <span className={styles.icNotice}>
                <div>
                  {/* <span>4</span>
                  <i className="icon icon-notification" /> */}
                  <NotificationPopUp />
                </div>
              </span>
            </>
            ) }
          </div>
          {token ? <UserDropdownMenu /> : (
            <div className={styles.icGroup} style={{ marginLeft: 50 }}>
              <button
                type="button"
                className={styles.signupBtn}
                onClick={() => {
                  navigate('auth/signup');
                }}
              >
                Sign Up
              </button>
              <button
                type="button"
                className={styles.loginBtn}
                onClick={() => {
                  navigate('auth/login');
                }}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
