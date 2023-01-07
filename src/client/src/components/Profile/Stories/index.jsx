import React from 'react';
import Card from 'components/Card';
import useFetch from 'hooks/useFetch';
import { useOutletContext, useParams } from 'react-router-dom';
import { INIT_DATA_CONTENT } from 'utils/const';
import styles from './styles.module.scss';

function UserStories() {
  const [setValue] = useOutletContext();

  const { userId } = useParams();

  const { data } = useFetch(`/story/author/${userId}`, INIT_DATA_CONTENT, (prev, _data) => {
    if (prev === INIT_DATA_CONTENT) {
      setValue(_data.data.length);
      return _data.data;
    }
    return [...Array.from(new Set([...prev, _data.data]))];
  });

  return (
    <div className={styles.postsTab}>
      <div className={styles.controlLayout} />
      <div className={styles.filter}>
        <div>
          <i
            className="icon icon-new_fill"
            style={{
              color: '#0079d3',
            }}
          />
          <span className="">New</span>
        </div>
        <div>
          <i
            className="icon icon-hot_fill"
            style={{
              color: 'orangered',
            }}
          />
          <span className="">Hot</span>
        </div>
        <div>
          <i
            className="icon icon-top_fill"
          />
          <span className="">Top</span>
        </div>
      </div>
      <div className={styles.body}>
        {data.map((content) => <Card key={content.id} content={content} type="small-verc" />)}
      </div>
    </div>
  );
}

export default UserStories;
