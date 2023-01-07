import React, { useEffect, useState } from 'react';

import Card from 'components/Card';
import Spinner from 'components/Spinner';

import { fullPathAPI } from 'utils/helpers';
import styles from './styles.module.scss';

function Trending() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const fetchApi = async () => {
    const getRes = await fetch(fullPathAPI(`story/trending/${count + 10}`));
    const res = await getRes.json();

    setData(res.data);
  };

  const handleScroll = async () => {
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
      setCount((prev) => prev + 10);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [count]);

  useEffect(() => {
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
