import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from 'assets/svg/logo.svg';
import { md5 } from 'utils/md5';
import { AuthContext } from 'contexts/Auth/authContext';
import { parseJwt } from 'utils/token';
import Menu from '../Menu';
import styles from './styles.module.scss';

function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useContext(AuthContext);

  if (location.pathname.startsWith('/auth')) return null;

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onCreateNewStory = () => {
    const { username } = parseJwt(token);
    const s = username + Date.now().toString();
    navigate(`/story/${md5(s)}/edit`);
  };

  const onClickUserDropdown = () => {

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
          <div className={styles.search}>
            <i className="icon icon-search" />
            <input value={search} onChange={onChangeSearch} placeholder="Search..." className={styles.inputField} />
          </div>
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
            <span className={styles.upgrade}>
              <i className="icon icon-topic_activism" style={{ color: '#fff' }} />
              <span>Unlimited Access</span>
            </span>
            <span className={styles.icChat}>
              <i className="icon icon-chat" />
            </span>
            <span className={styles.icNotice}>
              <div>
                <span>4</span>
                <i className="icon icon-notification" />
              </div>
            </span>
          </div>
          <div className={styles.headerUserDropdown}>
            <button aria-expanded="false" aria-haspopup="true" id="USER_DROPDOWN_ID" className={styles.dropdownUserBtn} onClick={onClickUserDropdown} type="button">
              <span className={styles.container}>
                <span id="email-collection-tooltip-id" className={styles.left}>
                  <div className={styles.avatarInfo}>
                    <div className={styles.avatar}>
                      <div className={styles.background} />
                      <div className={styles.userAvatar}>
                        <img
                          alt="User avatar"
                          className={styles.userAvatarImg}
                          src="https://styles.redditmedia.com/t5_6f2r74/styles/profileIcon_snood4a055ab-ddb5-47be-9395-3a2abdb35fb5-headshot.png?width=256&amp;height=256&amp;crop=256:256,smart&amp;s=cb1245dee672a703f1d297aae8f361b27bfc1d57"
                        />
                      </div>
                    </div>
                    <svg
                      className={styles.activeStatus}
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                    >
                      <circle cx="6" cy="6" r="4" />
                      <path
                        fill="white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
                      />
                    </svg>
                  </div>
                  <span className={styles.userInfo}>
                    <span className={styles.userName}>r2th</span>
                    <span className={styles.karma}>
                      <i className="icon icon-karma_fill" />
                      <span>1 karma</span>
                    </span>
                  </span>
                </span>
                <i className="icon icon-caret_down" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
