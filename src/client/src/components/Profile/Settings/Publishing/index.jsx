import React from 'react';
import styles from './style.module.scss';

function Publishing() {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <hr />
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <span className={styles.title}>Block users</span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Allow readers to leave private notes on your stories
              <div className={styles.annotation}>Private notes are visible to you and (if left in publication) all Editors of the publication</div>
            </div>
            <span>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Manage tipping on your stories
              <div className={styles.annotation}>Reader can send you tips through the third-party platform of your choice</div>
            </div>
            <span>
              <span className={styles.value}>Disable</span>
            </span>
          </span>
        </button>

        <hr />

        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Allow email replies
              <div className={styles.annotation}>Let readers reply to your stories directly from their email</div>
            </div>
            <span>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              &apos;Reply To&apos; email address
              <div className={styles.annotation}>Show to your subscribers when they reply</div>
            </div>
            <span>
              <span className={styles.value}>BytesGo@gmail.com</span>
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Import emails subscribers
              <div className={styles.annotation}>Upload a CSV or TXT file containing up to 5,000 email addresses</div>
            </div>
            <span>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>

        <hr />

        <h4>Promote email subscriptions</h4>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Share your subscribe pages
              <div className={styles.annotation}>This page allows readers to subcribe to you via email</div>
            </div>
            <span>
              <span className={styles.value}>Get Link</span>
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Customize your description promotion message
              <div className={styles.annotation}>This is the message on your subscribe, profile and story pages</div>
            </div>
            <span>
              <span className={styles.value}>Get Link</span>
            </span>
          </span>
        </button>
        <button className={styles.content} type="button">
          <span className={styles.parent_span}>
            <div className={styles.title}>
              Display a subscription promotion message
              <div className={styles.annotation}>A message will display after the second story on your profile and at the bottom of every story page.</div>
            </div>
            <span>
              <i className="fa fa-check" />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Publishing;
