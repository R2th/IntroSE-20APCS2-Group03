import React from 'react';
import Notifications from 'components/Notifications';
import styles from './styles.module.scss';

function NotificationPopUp() {
  const [notification, setNotification] = React.useState([
    {
      img: 'fa fa-user',
      notice: 'Hello World',
      time: '3 days ago',
    },
    {
      img: 'fa fa-check',
      notice: 'Hello World',
      time: '3 mins ago',
    },
    {
      img: 'fa fa-user',
      notice: 'Hello Worasdald',
      time: 'a few minutes ago',
    },
    {
      img: 'fa fa-user',
      notice: 'Hello asfaWorld',
      time: 'a few minutes ago',
    },
    {
      img: 'fa fa-user',
      notice: 'Hello Worafafafadflf',
      time: 'a few minutes ago',
    },
    {
      img: 'fa fa-user',
      notice: 'Heldgfsgdfglo World',
      time: 'a few minutes ago',
    },
    {
      img: 'fa fa-user',
      notice: 'May troll',
      time: 'a few minutes ago',
    },
    {
      img: 'fa fa-user',
      notice: 'Chet tao',
      time: 'a few minutes ago',
    },
  ]);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const onClickNotifications = () => {
    setIsOpen((prev) => !prev);
    console.log(setNotification);
  };

  return (
    <>
      <div className={styles.headerUserDropdown}>
        <button
          onClick={onClickNotifications}
          type="button"
          aria-expanded="false"
          aria-haspopup="true"
          id="USER_DROPDOWN_ID"
          className={styles.dropdownUserBtn}
          style={{ right: 8, borderRadius: 40 }}
        >
          <span className={styles.trolllll}>{notification.length}</span>
          <i className="icon icon-notification" />
        </button>
      </div>
      <Notifications isOpen={isOpen} handleClose={handleClose} notification={notification} className={styles.dropDownNotification} contentClassName={styles.dropDownUserMenuContent}>
        <div className={styles.menu}>
          <div className={styles.item}>
            <div className={styles.name}>
              <p>Notifications</p>
            </div>
            <ul>
              {notification.map((content) => (
                <div className={styles.contents}>
                  <i className={content.img} aria-hidden="true" style={{ borderRadius: 40, padding: 10 }} />
                  <div className={styles.notice}>{content.notice}</div>
                  <div className={styles.time}>{content.time}</div>
                </div>
              ))}
            </ul>
            <hr />
            <div className={styles.viewall}> See all </div>
          </div>
        </div>
      </Notifications>
    </>
  );
}

export default NotificationPopUp;
