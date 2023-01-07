import { AuthContext } from 'contexts/Auth/authContext';
import useFetch from 'hooks/useFetch';
import React, { useContext, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import Logo from 'assets/svg/logo.svg';

import styles from './styles.module.scss';

function SaveList() {
  const [setValue] = useOutletContext();
  const { token } = useContext(AuthContext);

  const { data } = useFetch('/collection', [], (prev, _data) => _data.data, {
    Authorization: `Bearer ${token}`,
  });

  useEffect(() => {
    setValue(data.length);
  }, [data]);

  return (
    <div className={styles.container}>
      {data.map((collection) => (
        <div className={styles.collection}>
          <div className={styles.content}>
            <div className={styles.header}>
              <h2>{collection.name}</h2>
            </div>
            <div className={styles.footer}>
              <div className={styles.count}>
                <p>
                  {collection.stories.length}
                  {' '}
                  stories
                </p>
                <i className="icon icon-lock" style={{ fontSize: 'inherit' }} />
              </div>
            </div>
          </div>
          <ReviewImgCollection stories={collection.stories.slice(0, 3)} />
        </div>
      ))}
    </div>
  );
}

function ReviewImgCollection({ stories }) {
  if (stories.length === 0) {
    return (
      <div>
        None
      </div>
    );
  }

  return (
    <div className={styles.reviewImageContainer}>
      {stories.map((story) => (
        <div className={styles.image}>
          <div style={{
            height: '100%',
            display: 'block',
          }}
          >
            {story.media_list.length > 0 ? <img src={story.media_list[0]} alt="thumbnail" /> : <img alt="default" src={Logo} style={{ background: 'black' }} />}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SaveList;
