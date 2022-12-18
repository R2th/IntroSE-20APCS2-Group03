import classNames from "classnames";
import React, { useContext, useState } from "react";
import { StylesContext } from "../../contexts/Styles/stylesContext";
import { AuthContext } from "../../contexts/Auth/authContext";

import Logo from "assets/svg/logo.svg";

import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { parseJwt } from "utils/helpers";
import { md5 } from "utils/md5";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { prefix } = useContext(StylesContext);
  const { token } = useContext(AuthContext);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onCreateNewStory = () => {
    const s = parseJwt(token).username || "r2th" + Date.now().toString();
    navigate(`/story/${md5(s)}/edit`);
  };

  return (
    <header className={styles.mainNavBar}>
      <div className={styles.container} id="nav-bar">
        <div
          className={styles.left}
          style={prefix > 0 ? { width: prefix } : {}}
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
          <div role="navigation" className={styles.filter}>
            <button tabIndex={0}>
              <span>Home</span>
              <i
                className={classNames(styles.icHome, "icon icon-home_fill")}
              ></i>
              <i
                className={classNames(styles.caretDown, "icon icon-caret_down")}
              ></i>
            </button>
          </div>
          <div className={styles.search}>
            <i className="icon icon-search"></i>
            <input
              value={search}
              onChange={onChangeSearch}
              placeholder="Search..."
              className={styles.inputField}
            />
          </div>
          <div className={styles.icGroup}>
            <span className={styles.icTrending}>
              <a href="/trending" aria-label="Trending">
                <i className="icon icon-popular"></i>
              </a>
            </span>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.icGroup}>
            <span className={styles.icAdd} onClick={onCreateNewStory}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-label="Write"
              >
                <path
                  d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
                  fill="currentColor"
                ></path>
                <path
                  d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
                  stroke="currentColor"
                ></path>
              </svg>
              <span>Write</span>
            </span>
            <span className={styles.upgrade}>
              <i
                className="icon icon-topic_activism"
                style={{ color: "#fff" }}
              ></i>
              <span>Unlimited Access</span>
            </span>
            <span className={styles.icChat}>
              <i className="icon icon-chat"></i>
            </span>
            <span className={styles.icNotice}>
              <div>
                <span>4</span>
                <i className="icon icon-notification"></i>
              </div>
            </span>
          </div>
          <div className={styles.headerUserDropdown}>
            <button
              aria-expanded="false"
              aria-haspopup="true"
              id="USER_DROPDOWN_ID"
              className={styles.dropdownUserBtn}
            >
              <span className={styles.container}>
                <span id="email-collection-tooltip-id" className={styles.left}>
                  <div className={styles.avatarInfo}>
                    <div className={styles.avatar}>
                      <div className={styles.background}></div>
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
                      <circle cx="6" cy="6" r="4"></circle>
                      <path
                        fill="white"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
                      ></path>
                    </svg>
                  </div>
                  <span className={styles.userInfo}>
                    <span className={styles.userName}>r2th</span>
                    <span className={styles.karma}>
                      <i className="icon icon-karma_fill"></i>
                      <span>1 karma</span>
                    </span>
                  </span>
                </span>
                <i className="icon icon-caret_down"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
