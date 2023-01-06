import React, { useRef } from 'react';
// import Notifications from 'components/Notifications';
import Modal from 'components/Modal';
import styles from './styles.module.scss';

function NotificationPopUp() {
  const [notification, setNotification] = React.useState([
    {
      img: 'fa fa-user', // avatar user
      notice: 'Hello World', // content
      time: '6 Jan 2023 at 21:21', // date
      state: 'bold', // bold: unread, normal: read
      type: 'fa fa-thumbs-up', // like, share, comment, upvote/downvote,...
    },
    {
      img: 'fa fa-check',
      notice: 'Hello, This is BytesGo project CS300 hahahaa lmao lmao lmao dark dark bruh bruh',
      time: '3 mins ago',
      state: 'bold',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-user',
      notice: 'Hello World. for i in ccjz print(i) print("Happy New Year"). Hahan"t an tet vui day',
      time: '6 Jan 2023 at 21:22',
      state: 'normal',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-user',
      notice: 'Hello asfaWorld',
      time: '6 Jan 2023 at 21:31',
      state: 'bold',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-user',
      notice: 'Hello Worafafafadflf',
      time: '6 Jan 2023 at 11:01',
      state: 'normal',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-user',
      notice: 'Heldgfsgdfglo World',
      time: '5 Jan 2021 at 22:21',
      state: 'bold',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-user',
      notice: 'May troll',
      time: '1 Jan 2023 at 21:21',
      state: 'bold',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-user',
      notice: 'LmaoLmao',
      time: '6 Feb 2022 at 21:21',
      state: 'normal',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-user',
      notice: 'Mach Vinh Phat',
      time: '3 Feb 2022 at 21:21',
      state: 'normal',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-user',
      notice: 'Cứu Tui',
      time: '6 Feb 2022 at 21:21',
      state: 'normal',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-user',
      notice: 'Cuu',
      time: '6 Feb 2022 at 21:21',
      state: 'normal',
      type: 'fa fa-thumbs-down',
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
    if (notification.length >= 8) {
      setNotification(notification.splice(-(notification.length), 8));
    }
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
          <span className={styles.count}>
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
        prefix={ref.current?.getBoundingClientRect().right - 500}
        width={500}
      >
        <div className={styles.menu}>
          <div className={styles.item}>
            <div className={styles.name}>
              <p>Notifications</p>
            </div>
            <ul>
              {notification.map((content) => (
                <div>
                  <div className={styles.contents}>
                    <div className={styles.ava_type}>
                      <i
                        className={content.img}
                        aria-hidden="true"
                        style={{
                          borderRadius: 100, background: '#fade7c', padding: 15, fontSize: 20,
                        }}
                      />
                      <div className={styles.types}>
                        <i
                          className={content.type}
                          aria-hidden="true"
                          style={{
                            borderRadius: 100, background: '#2c5d87', padding: 2, width: 'auto',
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className={styles.notice} style={{ fontWeight: content.state }}>{content.notice}</p>
                    </div>
                    <div className={styles.time}>{content.time}</div>

                  </div>
                </div>
              ))}
            </ul>
            <hr />
            <div className={styles.viewall}>
              <button onClick={onMarkAllRead} type="button">Mark all read</button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default NotificationPopUp;
