import React, { useRef } from 'react';
// import Notifications from 'components/Notifications';
import Modal from 'components/Modal';
import styles from './styles.module.scss';

function NotificationPopUp() {
  const [notification, setNotification] = React.useState([
    {
      img: 'fa fa-user',
      notice: 'Hello World',
      time: '3 days ago',
      state: 'bold',
    },
    {
      img: 'fa fa-check',
      notice: 'Hello World',
      time: '3 mins ago',
      state: 'bold',
    },
    {
      img: 'fa fa-user',
      notice: 'Hello Worasdald',
      time: 'a few minutes ago',
      state: 'normal',
    },
    {
      img: 'fa fa-user',
      notice: 'Hello asfaWorld',
      time: 'a few minutes ago',
      state: 'bold',
    },
    {
      img: 'fa fa-user',
      notice: 'Hello Worafafafadflf',
      time: 'a few minutes ago',
      state: 'normal',
    },
    {
      img: 'fa fa-user',
      notice: 'Heldgfsgdfglo World',
      time: 'a few minutes ago',
      state: 'bold',
    },
    {
      img: 'fa fa-user',
      notice: 'May troll',
      time: 'a few minutes ago',
      state: 'bold',
    },
    {
      img: 'fa fa-user',
      notice: 'Chet tao',
      time: 'a few minutes ago',
      state: 'normal',
    },
  ]);

  const countUnread = () => {
    let cnt = 0;
    for (let i = 0; i < notification.length; i += 1) {
      if (notification[i].state === 'normal') cnt += 1;
    }
    return cnt;
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  const onMarkAllRead = () => {
    for (let i = 0; i < notification.length; i += 1) {
      if (notification[i].state === 'bold') {
        notification[i].state = 'normal';
      }
    }
  };
  const onClickNotifications = () => {
    setIsOpen((prev) => !prev);
    console.log(setNotification);
  };

  const ref = useRef();

  return (
    <>
      <div className={styles.headerUserDropdown} ref={ref}>
        <button
          onClick={onClickNotifications}
          type="button"
          aria-expanded="false"
          aria-haspopup="true"
          id="USER_DROPDOWN_ID"
          className={styles.dropdownUserBtn}
          style={{ right: 8, borderRadius: 40 }}
        >
          <span className={styles.trolllll}>
            {notification.length - countUnread()}
          </span>
          <i className="icon icon-notification" />
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        className={styles.dropDownNotification}
        contentClassName={styles.dropDownUserMenuContent}
        // eslint-disable-next-line
        prefix={ref.current?.getBoundingClientRect().right - 264}
        width={264}
      >
        <div className={styles.menu}>
          <div className={styles.item}>
            <div className={styles.name}>
              <p>Notifications</p>
            </div>
            <ul>
              {notification.map((content) => (
                <div className={styles.contents}>
                  <div style={{ display: 'flex' }}>
                    <i className={content.img} aria-hidden="true" style={{ borderRadius: 40, padding: 10 }} />
                    <div className={styles.notice} style={{ fontWeight: content.state }}>{content.notice}</div>
                  </div>
                  <div className={styles.time}>{content.time}</div>
                </div>
              ))}
            </ul>
            <hr />
            <div className={styles.viewall}>
              <button type="button"> View details </button>
              <button style={{ direction: 'rtl' }} onClick={onMarkAllRead} type="button">Mark all read</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default NotificationPopUp;
