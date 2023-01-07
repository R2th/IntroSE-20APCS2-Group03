import React from 'react';
import styles from './style.module.scss';

function Security() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <hr />
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title} style={{ color: 'rgb(201, 74, 74)' }}>
              Sign out of all other sessions
              <div className={styles.annotation}>Sign out of sessions in other browsers or on other computers.</div>
            </div>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Download your information
              <div className={styles.annotation}>Download a copy of the information you’ve shared on Medium to a .zip file.</div>
            </div>
          </span>
        </button>
        <hr />
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Connect facebook
              <div className={styles.annotation}>We will never post to Facebook or message your friends without your permission.</div>
            </div>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Connect Twitter
              <div className={styles.annotation}>We will never post to Twitter or message your followers without your permission.</div>
            </div>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Connect Google
              <div className={styles.annotation}>We will connect to Google account and send email when BytesGo get notifications.</div>
            </div>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Security;
