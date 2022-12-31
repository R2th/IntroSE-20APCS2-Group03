import React from 'react';
import styles from './styles.module.scss';
import ChangePassword from 'components/ChangePassword';
import AboutUs from '../../components/AboutUs';
import Payment from '../../components/Payment';

const Profile = () => {
  return (
    <div className={styles.containter}>
      <h2>Profile</h2>
      <hr></hr>
      <div className={styles.frame_selection}>
        <ul className={styles.option}>
          <p>Edit Profile</p>
          <div>
            <a href="/payment">Payment</a>
          </div>
          <div>
            <a href="/change_password">Change Password</a>
          </div>
          <div>
            <a href="/change_avatar">Change Avatar</a>
          </div>
          <hr></hr>
          <p>Content</p>
          <div>
            <a href="/favorite">Favorite</a>
          </div>
          <div>
            <a href="/your_story">Your Story</a>
          </div>
          <div>
            <a href="/message">Messages</a>
          </div>
          <hr></hr>
          <p>Preferences</p>
          <div>
            <a href="/language">Languages</a>
          </div>
          <div>
            <a href="/darkmode">Dark Mode</a>
          </div>
          <div>
            <a href="/Deactive">Deactived Account</a>
          </div>
          <div>
            <a href="/aboutus">About Us</a>
          </div>
          <div>
            <a href="/logout">Log Out</a>
          </div>
        </ul>
      </div>
      <div className={styles.page}>
        <ChangePassword />
        <AboutUs />
        <Payment />
      </div>
    </div>
  );
};

export default Profile;
