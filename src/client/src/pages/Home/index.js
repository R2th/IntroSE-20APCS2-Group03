import React, { useContext, useEffect } from "react";

import Card from "components/Card";
import Sidebar from "components/Sidebar";

import { INIT_DATA_CONTENT } from "utils/const";

import { StylesContext } from "contexts/Styles/stylesContext";
import { useFetch } from "hooks/useFetch";

import "./style.scss";

const Home = () => {
  const fetchContent = useFetch("/posts/newest", INIT_DATA_CONTENT);
  const fetchTrending = useFetch("/trending?limit=10", INIT_DATA_CONTENT);

  const { setPrefix } = useContext(StylesContext);

  const contents = fetchContent.data;
  const trending = fetchTrending.data;

  useEffect(() => {
    const prefix = document
      .querySelector(".center-box")
      .getBoundingClientRect().x;
    setPrefix(prefix);
    //eslint-disable-next-line
  }, []);

  return (
    <div className="homepage">
      <div style={{ backgroundColor: "white", marginLeft: 100 }}>
        <div className="background"></div>
        {/* <div className="white-bg"></div> */}
        <div className="center-box">
          <div className="contents">
            <div className="section">
              <div className="section_title">
                <h1>Top Trending</h1>
              </div>
              <div className="section_content">
                {trending.map((content) => (
                  <Card content={content} key={content.id} type="medium" />
                ))}
              </div>
              <div className="hoz-line"></div>
            </div>
            {contents &&
              contents
                .slice(10)
                .map((content) => <Card content={content} key={content.id} />)}
            <div className="section">
              <div className="section_title">
                <h1>Member only</h1>
              </div>
              <div className="section_content">
                {trending.map((content) => (
                  <Card content={content} key={content.id} type="small-verc" />
                ))}
              </div>
              <div className="hoz-line"></div>
            </div>
            {contents &&
              contents
                .slice(-10)
                .map((content) => <Card content={content} key={content.id} />)}
            <div className="section">
              <div className="section_title">
                <h1>For you</h1>
              </div>
              <div className="section_content">
                {trending.map((content) => (
                  <Card content={content} key={content.id} type="small-hoz" />
                ))}
              </div>
              <div className="hoz-line"></div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
