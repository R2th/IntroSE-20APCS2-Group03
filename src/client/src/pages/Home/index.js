import React, { useState, useEffect } from "react";
import Card from "components/Card";
import NavBar from "components/NavBar";
import Sidebar from "components/Sidebar";

import { fullPathAPI } from "utils/helpers";
import { INIT_DATA_CONTENT, API_STATUS_SUCCESS } from "utils/const";

import "./style.scss";
import axios from "axios";

const Home = () => {
  const [contents, setContents] = useState(INIT_DATA_CONTENT);
  const [trending, setTrending] = useState(INIT_DATA_CONTENT);

  useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await axios(fullPathAPI("/posts/newest"));
      if (status === API_STATUS_SUCCESS) {
        setContents(data.data);
      } else {
        console.error(status);
      }
    };

    const fetchDataTrending = async () => {
      const { data, status } = await axios(fullPathAPI("/trending?limit=10"));
      if (status === API_STATUS_SUCCESS) {
        setTrending(data.data);
      } else {
        console.error(status);
      }
    };

    fetchDataTrending();
    fetchData();
  }, []);

  return (
    <div className="homepage">
      <div style={{ backgroundColor: "white", marginLeft: 100 }}>
        <div className="background"></div>
        <div className="white-bg"></div>
        <div className="center-box">
          <NavBar />
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
