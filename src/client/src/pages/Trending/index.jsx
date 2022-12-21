import React, { useEffect } from 'react';

// eslint-disable-next-line
import Card from 'components/Card';
// eslint-disable-next-line
import Spinner from 'components/Spinner';

// eslint-disable-next-line
import useFetch from 'hooks/useFetch';

// eslint-disable-next-line
import { INIT_DATA_CONTENT } from 'utils/const';
// eslint-disable-next-line
import { encodeQueryData } from 'utils/helpers';

import styles from './styles.module.scss';

function Trending() {
  const { data, reloadFetch } = useFetch(`/trending?${encodeQueryData({ limit: 100 })}`, INIT_DATA_CONTENT);

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
    // eslint-disable-next-line
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
