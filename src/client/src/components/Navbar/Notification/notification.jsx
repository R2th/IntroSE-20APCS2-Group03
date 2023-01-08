import React, { useRef } from 'react';
// import Notifications from 'components/Notifications';
import Modal from 'components/Modal';
import styles from './styles.module.scss';

function NotificationPopUp() {
  const [notification, setNotification] = React.useState([
    {
      img: 'fa fa-check', // avatar user
      notice: 'Nguyen Xuan Quang upvotes your story', // content
      time: '6 Jan 2023 at 21:21', // date
      state: 'bold', // bold: unread, normal: read
      type: 'fa fa-thumbs-up', // like, share, comment, upvote/downvote,...
    },
    {
      img: 'fa fa-check',
      notice: 'Nguyen Xuan Quang downvotes your story',
      time: '3 mins ago',
      state: 'bold',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-check',
      notice: 'Yay! You have become the premium member. Now, you can view all stories with premium label',
      time: '6 Jan 2023 at 21:22',
      state: 'normal',
      type: 'fa fa-thumbs-up',
    },
    {
      img: 'fa fa-check',
      notice: 'Mach Vinh Phat starts following you',
      time: '6 Jan 2023 at 21:31',
      state: 'bold',
      type: 'fa fa-thumbs-up',
    },
    {
      img: 'fa fa-check',
      notice: 'Nguyen Quang Tan and Le Minh Hoang upvote your story',
      time: '6 Jan 2023 at 11:01',
      state: 'normal',
      type: 'fa fa-thumbs-up',
    },
    {
      img: 'fa fa-check',
      notice: 'Truong Duc Thang has shared your stories to everyone!',
      time: '5 Jan 2021 at 22:21',
      state: 'bold',
      type: 'fa fa-thumbs-up',
    },
    {
      img: 'fa fa-check',
      notice: 'Some one reported you that you are cheating on BytesGo. If we find any problems, your account will be banned.',
      time: '1 Jan 2023 at 21:21',
      state: 'bold',
      type: 'fa fa-flag',
    },
    {
      img: 'fa fa-check',
      notice: 'Welcome to BytesGo, this is the app you can connect to everyone. If you want to premium members, please pay',
      time: '6 Feb 2022 at 21:21',
      state: 'normal',
      type: 'fa fa-flag',
    },
    {
      img: 'fa fa-check',
      notice: 'Mach Vinh Phat',
      time: '3 Feb 2022 at 21:21',
      state: 'normal',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-check',
      notice: 'Cứu Tui',
      time: '6 Feb 2022 at 21:21',
      state: 'normal',
      type: 'fa fa-thumbs-down',
    },
    {
      img: 'fa fa-check',
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
        prefix={ref.current?.getBoundingClientRect().right - 375}
        width={375}
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
                          borderRadius: 100, background: '#fade7c', padding: 15, fontSize: 30,
                        }}
                      />
                      <div className={styles.types}>
                        <i
                          className={content.type}
                          aria-hidden="true"
                          style={{
                            borderRadius: 100, background: '#add8e6', padding: 2, width: 'auto',
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className={styles.notice} style={{ fontWeight: content.state }}>{content.notice}</p>
                      <p className={styles.time} style={{ fontWeight: content.state }}>{content.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
            <hr style={{ margin: 0 }} />
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
