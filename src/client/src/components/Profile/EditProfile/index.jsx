import classNames from 'classnames';
import Modal from 'components/Modal';
import React, { useState } from 'react';
import { fullPathImage } from 'utils/helpers';

import styles from './styles.module.scss';

function EditProfile() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button type="button" className={styles.editProfile} onClick={() => setIsOpen(true)}>Edit profile</button>
      <Modal isOpen={isOpen} handleClose={handleClose} contentClassName={styles.form}>
        <div className={styles.newCollectionForm}>
          <div className={styles.body}>
            <div className={styles.dump}>
              <div className={styles.content}>
                <div>
                  <div className={styles.header}>
                    <h2>Profile information</h2>
                  </div>
                  <div className={styles.form}>
                    <div className={classNames(styles.formEditAvatar, styles.title)}>
                      <input type="file" accept="image/gif, image/jpeg, image/png" />
                      <div style={{ marginBottom: 10, color: 'rgba(117,117,117, 1)' }}>Photo</div>
                      <div className={styles.editAvatar}>
                        <button type="button" className={styles.avatarUser}>
                          <div className={styles.avatar}>
                            <img alt="" src={fullPathImage({})} />
                          </div>
                        </button>
                        <div className={styles.avatarAction}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: 16,
                          }}
                          >
                            <button type="button" className={classNames(styles.avatarBtn, styles.update)}>
                              <span>Update</span>
                            </button>
                            <button type="button" className={classNames(styles.avatarBtn, styles.remove)}>
                              <span>Remove</span>
                            </button>
                          </div>
                          <p>Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p>
                        </div>
                      </div>
                    </div>
                    <div className={styles.title}>
                      <span style={{
                        color: 'rgba(41, 41, 41, 1)',
                        lineHeight: '20px',
                        fontSize: 14,
                      }}
                      >
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                        }}
                        >
                          <div style={{ marginBottom: 10, color: 'rgba(117,117,117, 1)' }}>Name</div>
                          <div className={styles.input}>
                            <input placeholder="Give me a name" type="text" />
                          </div>
                          <div className={styles.count}>
                            <p className={styles.validation}>Appears on your Profile page, as your byline, and in your responses.</p>
                            <p className={styles.num}>
                              <span>0</span>
                              /60
                            </p>
                          </div>
                        </div>
                      </span>
                    </div>
                    <div className={styles.title}>
                      <span style={{
                        color: 'rgba(41, 41, 41, 1)',
                        lineHeight: '20px',
                        fontSize: 14,
                      }}
                      >
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                        }}
                        >
                          <div style={{ marginBottom: 10, color: 'rgba(117,117,117, 1)' }}>Bio</div>
                          <div className={styles.input}>
                            <input placeholder="Give me a name" type="text" />
                          </div>
                          <div className={styles.count}>
                            <p className={styles.validation}>Appears on your Profile and next to your stories.</p>
                            <p className={styles.num}>
                              <span>0</span>
                              /180
                            </p>
                          </div>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.action}>
                  <button type="button" className={styles.cancelBtn} onClick={handleClose}>Cancel</button>
                  <button type="button" className={styles.submitBtn}>Update</button>
                </div>
              </div>
            </div>
          </div>
          <i className="icon icon-close" style={{ cursor: 'pointer' }} onClick={handleClose} aria-hidden />
        </div>
      </Modal>
    </>
  );
}

export default EditProfile;
