import React from 'react';
import styles from './style.module.scss';

function Account() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.content}>
          <div className={styles.title}>Manage publications</div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>Allow leader to leave private notes on your stories</div>
          <i className="fa fa-envelope" />
        </div>
        <div className={styles.content}>
          <div className={styles.content}>
            <span className={styles.title}>Profile Infomation</span>
            <span className={styles.title}>Edit your informations</span>
          </div>
          <div>
            <i className="fa fa-envelope" />
            <div className={styles.value}>None</div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.content}>
            <span className={styles.title}>Custom domain</span>
            <span className={styles.title}>Upgrade to a Medium Membership to redirect your profile URL to a domain</span>
          </div>
          <div>
            <i className="fa fa-envelope" />
            <div className={styles.value}>None</div>
          </div>
        </div>
        <hr />
        <div className={styles.content}>
          <div className={styles.content}>
            <span className={styles.title}>Custom domain</span>
            <span className={styles.title}>Upgrade to a Medium Membership to redirect your profile URL to a domain</span>
          </div>
          <div>
            <i className="fa fa-envelope" />
            <div className={styles.value}>None</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
