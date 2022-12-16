import React, { useState } from "react";
import { buildPath, fullPathAPI } from "utils/helpers";

import styles from "./styles.module.scss";

const Postman = () => {
  const [count, setCount] = useState(null);
  const [current, setCurrent] = useState([]);

  function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
    return ret.join("&");
  }

  const extractMediaList = (content) => {
    let regex = /\!\[image.png]\(([-a-zA-Z0-9(@:%_\+.~#?&\/\/=]*)/gi;
    return content
      .match(regex)
      ?.reduce(
        (prev, cur) => [...prev, cur.slice("[image.png](".length + 1)],
        []
      );
  };

  const onDownloadContent = async (data) => {
    const filename = data.url.slice(
      "https://viblo.asia/p/".length,
      -1 * data.slug.length - 1
    );

    setCurrent((prev) => [
      ...prev,
      {
        filename,
        status: "pending",
      },
    ]);

    const file = new File([data.contents], filename, {
      type: "text/markdown",
    });

    const mediaList = extractMediaList(data.contents);
    const storyData = {
      id: data.id,
      file_id: filename + ".md",
      title: data.title,
      author_id: 1,
      tag: data.tags.data.reduce((prev, cur) => [...prev, cur.slug], []),
      isPremium: false,
      media_list: mediaList,
    };

    const form = new FormData();
    form.append("story", file);
    form.append("data", JSON.stringify(storyData));

    const postResponse = await fetch(
      buildPath("http://localhost:2022", "/story/crawl"),
      {
        method: "POST",
        body: form,
      }
    );

    const status = await postResponse.json();
    setCurrent((prev) =>
      prev.map((data) => {
        if (data.filename === filename) {
          if (status.filename) {
            return { ...data, status: "success" };
          } else if (status.error) {
            console.log(filename, status.error);
            return { ...data, status: "error" };
          }
        }
        return { ...data };
      })
    );
  };

  const onCrawlData = async () => {
    let total = 0;
    let i = 152;
    const limit = 100;
    do {
      i += 1;
      const getResponse = await fetch(
        fullPathAPI(`/posts/newest?${encodeQueryData({ limit, page: i })}`)
      );
      const resJson = await getResponse.json();
      resJson.data.forEach(async (data) => {
        await onDownloadContent(data);
      });
      total = resJson.meta.pagination.total;
      setCount(i * 100);
    } while (i * 100 < total);
  };

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={onCrawlData}>
        Crawl {count}
      </div>
      <div>
        {current.map((data, idx) => (
          <div key={idx} className={styles.title}>
            {idx + 1}: {data.filename}
            <div
              style={{
                width: 15,
                height: 15,
                borderRadius: "50%",
                backgroundColor:
                  data.status === "pending"
                    ? "orange"
                    : data.status === "success"
                    ? "green"
                    : "red",
                boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.6)",
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Postman;
