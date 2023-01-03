import React, { useState, useContext } from 'react';
import Modal from 'components/Modal';
import classNames from 'classnames';
import { AuthContext } from 'contexts/Auth/authContext';
import { useNavigate } from 'react-router-dom';
import { parseJwt } from 'utils/token';
import useFetch from 'hooks/useFetch';
import styles from './styles.module.scss';

const INIT_USER_INFO = {
  avatar: 'https://viblo.asia/images/mm.png',
};

function UserDropdownMenu() {
  const navigate = useNavigate();
  const { token, handleLogout } = useContext(AuthContext);
  const { username } = parseJwt(token);

  const { data } = useFetch(`/user/${username}`, INIT_USER_INFO, (prev, _data) => _data.data);

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onClickUserDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
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
                      src={data.avatar}
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
                <span className={styles.userName}>
                  {`${data.first_name} ${data.last_name}` || data.username}
                </span>
                <span className={styles.karma}>
                  {/* <i className="icon icon-karma_fill" /> */}
                  <span>
                    @
                    {username}
                  </span>
                </span>
              </span>
            </span>
            <i className="icon icon-caret_down" />
          </span>
        </button>
      </div>
      <Modal isOpen={isOpen} handleClose={handleClose} className={styles.dropDownUserMenu} contentClassName={styles.dropDownUserMenuContent}>
        <div className={styles.menu}>
          <div style={{ cursor: 'pointer' }} type="button" onClick={() => navigate(`/${username}`)} aria-hidden>
            <div className={styles.item}>
              <div>
                <i className="icon icon-profile" style={{ color: 'inherit' }} />
                <div className={styles.content}>
                  <p>Profile</p>
                </div>
              </div>
            </div>
          </div>
          <a href="list">
            <div className={styles.item}>
              <div>
                <i className="icon icon-save_table" style={{ color: 'inherit' }} />
                <div className={styles.content}>
                  <p>Lists</p>
                </div>
              </div>
            </div>
          </a>
          <a href="stories">
            <div className={styles.item}>
              <div>
                <i className="icon icon-text_post" style={{ color: 'inherit' }} />
                <div className={styles.content}>
                  <p>Stories</p>
                </div>
              </div>
            </div>
          </a>
          <a href="stats">
            <div className={styles.item}>
              <div>
                <i className="icon icon-statistics" style={{ color: 'inherit' }} />
                <div className={styles.content}>
                  <p>Stats</p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className={styles.menu}>
          <a href="settings">
            <div className={styles.item}>
              Settings
            </div>
          </a>
          <a href="following">
            <div className={styles.item}>
              Refine recommendations
            </div>
          </a>
          <a href="publication">
            <div className={styles.item}>
              Manage publications
            </div>
          </a>
        </div>
        <div className={styles.menu}>
          <a href="premium">
            <div className={styles.item}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                Become a member
                <i className="icon icon-star_fill" style={{ color: '#ffc800' }} />
              </div>
            </div>
          </a>
          <a href="earn">
            <div className={styles.item}>
              Apply to the Partner Program
            </div>
          </a>
          <a href="gift">
            <div className={styles.item}>
              Gift a membership
            </div>
          </a>
        </div>
        <div className={styles.menu}>
          <button className={classNames(styles.item, styles.logoutBtn)} type="button" onClick={handleLogout}>
            <div>
              <i className="icon icon-logout" style={{ color: 'inherit' }} />
              <div className={styles.content}>
                <p>Log Out</p>
              </div>
            </div>
          </button>
          <div className={styles.notes}>
            <span>
              © 2023 BytesGo, Inc. All rights reserved
            </span>
          </div>
        </div>

      </Modal>
    </>
  );
}

export default UserDropdownMenu;
