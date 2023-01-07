import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import Account from './Account';
import Security from './Security';
import Publishing from './Publishing';
import NotificationSettings from './Notification';

function Settings() {
  const [option, setOption] = React.useState(1);

  const OnChangeOptions = (value) => () => {
    setOption(value);
  };

  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.help}>
        <div className={styles.content}>
          <h3>Suggested help articles</h3>
          <div>Sign in or sign up to BytesGo</div>
          <div>Your profile page</div>
          <div>Writing and publishing your first story</div>
          <div>About BytesGo&apos;s distribution system</div>
          <div>Get started with the Partner Program</div>
          <div className={styles.term}>
            <div>
              <span>Help</span>
              <span>Status</span>
              <span>Writers</span>
              <span>Blog</span>
              <span>Carrers</span>
              <span>Privacy</span>
              <span>Terms</span>
            </div>
            <div>
              <span>About</span>
              <span>Text to speech</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        <h1>Settings</h1>
        <div className={styles.list_option}>
          <button className={styles.option} onClick={OnChangeOptions(1)} style={{ textDecoration: option === 1 ? 'underline' : 'none', fontWeight: option === 1 ? 'bold' : 'normal' }} type="button">Account</button>
          <button className={styles.option} onClick={OnChangeOptions(2)} style={{ textDecoration: option === 2 ? 'underline' : 'none', fontWeight: option === 2 ? 'bold' : 'normal' }} type="button">Publishing</button>
          <button className={styles.option} onClick={OnChangeOptions(3)} style={{ textDecoration: option === 3 ? 'underline' : 'none', fontWeight: option === 3 ? 'bold' : 'normal' }} type="button">Notification</button>
          <button
            className={styles.option}
            onClick={() => {
              navigate('/premium');
            }}
            style={{ textDecoration: option === 4 ? 'underline' : 'none', fontWeight: option === 4 ? 'bold' : 'normal' }}
            type="button"
          >
            Membership and payment

          </button>
          <button className={styles.option} onClick={OnChangeOptions(5)} style={{ textDecoration: option === 5 ? 'underline' : 'none', fontWeight: option === 5 ? 'bold' : 'normal' }} type="button">Security and apps</button>
        </div>
        {option === 1 && <Account />}
        {option === 2 && <Publishing />}
        {option === 3 && <NotificationSettings />}
        {option === 5 && <Security />}
      </div>
    </div>
  );
}

export default Settings;
