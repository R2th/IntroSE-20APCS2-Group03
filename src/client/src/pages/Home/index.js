import React, { useState, useEffect } from "react";
import Card from "components/Card";
import { bypassCORSUrl } from "../../utils/helpers";

const Home = () => {
  const [contents, setContents] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(bypassCORSUrl("https://viblo.asia/api/posts/newest"))
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setContents(data.data);
        })
        .catch((err) => setContents(err));
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="left"></div>
      {contents && contents.length > 0 && (
        <div className="content">
          {contents.map((content) => (
            <Card content={content} />
          ))}
        </div>
      )}
      <div className="right"></div>
    </div>
  );
};

export default Home;
