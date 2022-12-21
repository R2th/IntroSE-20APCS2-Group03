import React, { useState } from 'react';
// eslint-disable-next-line
import { buildPath, fullPathAPI, encodeQueryData } from 'utils/helpers';

import styles from './styles.module.scss';

const STATUS = {
  pending: 'orange',
  success: 'green',
  error: 'red',
};

function Postman() {
  const [count, setCount] = useState(null);
  const [current, setCurrent] = useState([]);

  const extractMediaList = (contents) => {
    // eslint-disable-next-line
    const regex = /\!\[[-a-zA-Z0-9(@:%_\+.~#?&\/\/=]*\]\(([-a-zA-Z0-9(@:%_\+.~#?&\/\/=]*)\)/gi;
    return contents.matchAll(regex).map((match) => match[1]);
  };

  const onDownloadContent = async (data) => {
    const filename = data.url.slice('https://viblo.asia/p/'.length, -1 * data.slug.length - 1);

    setCurrent((prev) => [
      ...prev,
      {
        filename,
        status: 'pending',
      },
    ]);

    // const file = new File([data.contents], filename, {
    //   type: "text/markdown",
    // });

    const mediaList = extractMediaList(data.contents);

    const storyData = {
      id: data.id,
      contents: data.contents,
      contents_short: data.contents_short,
      title: data.title,
      author_id: 1,
      tag: data.tags.data.reduce((prev, cur) => [...prev, cur.slug], []),
      isPremium: false,
      media_list: mediaList,
    };

    const form = new FormData();
    // form.append("story", file);
    form.append('data', JSON.stringify(storyData));

    const postResponse = await fetch(buildPath('http://localhost:2022', '/story/crawl'), {
      method: 'POST',
      body: form,
    });

    const status = await postResponse.json();
    setCurrent((prev) => prev.map((content) => {
      if (content.filename === filename) {
        if (status.filename) {
          return { ...content, status: 'success' };
        } if (status.error) {
          console.log(filename, status.error);
          return { ...content, status: 'error' };
        }
      }
      return { ...content };
    }));
  };

  const onCrawlData = async () => {
    // let total = 0;
    let i = 152;
    const limit = 100;
    i += 1;
    const getResponse = await fetch(fullPathAPI(`/posts/newest?${encodeQueryData({ limit, page: i })}`));
    const resJson = await getResponse.json();
    resJson.data.forEach(async (data) => {
      await onDownloadContent(data);
    });
    // total = resJson.meta.pagination.total;
    setCount(i * 100);
  };

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={onCrawlData} aria-hidden>
        Crawl
        {' '}
        {count}
      </div>
      <div>
        {current.map((data, idx) => (
          <div key={data.filename} className={styles.title}>
            {idx + 1}
            :
            {data.filename}
            <div
              style={{
                width: 15,
                height: 15,
                borderRadius: '50%',
                backgroundColor: STATUS[data.status],
                boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.6)',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Postman;
