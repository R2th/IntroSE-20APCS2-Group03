import React from 'react';
import styles from './style.module.scss';

function NotificationSettings() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <hr />
        <h2>Email notifications</h2>
        <h3>Story recommendations</h3>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Medium Digest
              <div className={styles.annotation}>The best stories on BytesGo personalized based on your interests</div>
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-angle-down" aria-hidden="true" />
              <span className={styles.value}>Daily</span>
            </span>
          </span>
        </button>

        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Recommended reading
              <div className={styles.annotation}>Featured stories, columns, and collections you enjoy based on your reading history.</div>
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <hr />
        <h3>From writers and publications</h3>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              New stories from writers you’ve subscribed to
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Digests from publications you follow
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Newsletters from publications
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <hr />
        <h3>Social activity</h3>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              When someone follows you or highlights the same passage in a story
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              When someone mentions you in their story
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-angle-down" />
              <span className={styles.value}>In network</span>
            </span>
          </span>
        </button>
        <hr />
        <h3>For writers</h3>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Notifications on your published stories
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Notifications on your lists
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              From editors about featuring your stories
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <hr />
        <h3>Others from BytesGo</h3>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              New product features from BytesGo
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Information about BytesGo membership
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Writing updates and announcements
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <hr />
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Allow email notifications
              <div className={styles.annotation}>You’ll still receive administrative emails even if this setting is off.</div>
            </div>
            <span style={{ color: '#1a8917' }}>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <hr />
        <h2>Push notifications</h2>
        <div className={styles.title} style={{ margin: 10 }}>Open the Medium app from your mobile device to make changes to push notifications.</div>
      </div>
    </div>
  );
}

export default NotificationSettings;
