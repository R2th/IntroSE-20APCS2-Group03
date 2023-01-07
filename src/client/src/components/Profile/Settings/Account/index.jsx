import React from 'react';
import styles from './style.module.scss';

function Account() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <hr />
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <span className={styles.title}>Email Address</span>
            <span className={styles.value}>BytesGo@gmail.com</span>
          </span>

        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <span className={styles.title}>User Name</span>
            <span className={styles.value}>BytesGo</span>
          </span>
        </button>

        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Profile informations
              <div className={styles.annotation}>Edit your photo, names, bio, etc.</div>
            </div>
            <span>
              <i className="fa fa-user" aria-hidden="true" />
              <span className={styles.value}>BytesGo</span>
            </span>
          </span>
        </button>

        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Profile design
              <div className={styles.annotation}>Pick color and fonts, styles the header, and make your profile unique</div>
            </div>
            <span>
              <i className="fa fa-arrow-right" aria-hidden="true" />
              <span className={styles.value}>BytesGo</span>
            </span>
          </span>
        </button>

        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Custom domain
              <div className={styles.annotation}>Upgrade to a BytesGo Membership to redirect your profile URL</div>
            </div>
            <span>
              <i className="fa fa-arrow-right" aria-hidden="true" />
              <span className={styles.value}>BytesGo</span>
            </span>
          </span>
        </button>

        <hr />

        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <span className={styles.title}>Muted writers and publications</span>
            <i className="fa fa-arrow-right" aria-hidden="true" />
          </span>
        </button>

        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <span className={styles.title}>Block users</span>
          </span>
        </button>

        <hr />

        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title} style={{ color: 'rgb(201, 74, 74)' }}>
              Deactivate account
              <div className={styles.annotation}>Deactivate will suspend your account until you sign back in</div>
            </div>
          </span>
        </button>

        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title} style={{ color: 'rgb(201, 74, 74)' }}>
              Delete account
              <div className={styles.annotation}>Permanently delete your account and all of your content</div>
            </div>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Account;
