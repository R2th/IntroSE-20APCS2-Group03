import React, { useEffect } from 'react';

import Card from 'components/Card';
import Spinner from 'components/Spinner';

import useFetch from 'hooks/useFetch';

import { INIT_DATA_CONTENT } from 'utils/const';

import styles from './styles.module.scss';

function Trending() {
  const { data, reloadFetch } = useFetch('/story/newest/10', INIT_DATA_CONTENT);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
      const { body } = document;
      const html = document.documentElement;
      const docHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight,
      );
      const windowBottom = Math.round(windowHeight + window.pageYOffset);
      if (windowBottom >= docHeight) {
        reloadFetch();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.stories} id="story">
        {data.length === 0 ? (
          <Spinner className={styles.spinnerFull} />
        ) : (
          <>
            {data.map((story) => (
              <Card key={story.id} content={story} />
            ))}
            <Spinner className={styles.spinner} />
          </>
        )}
      </div>
    </div>
  );
}

export default Trending;
