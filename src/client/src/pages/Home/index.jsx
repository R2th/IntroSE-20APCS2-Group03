import React, { useContext, useEffect } from 'react';

// eslint-disable-next-line
import Card from 'components/Card';
// eslint-disable-next-line
import Sidebar from 'components/Sidebar';

// eslint-disable-next-line
import { INIT_DATA_CONTENT } from 'utils/const';

// eslint-disable-next-line
import { StylesContext } from 'contexts/Styles/stylesContext';
// eslint-disable-next-line
import useFetch from 'hooks/useFetch';

import './style.scss';

function Home() {
  const fetchContent = useFetch('/posts/newest', INIT_DATA_CONTENT);
  const fetchTrending = useFetch('/trending?limit=10', INIT_DATA_CONTENT);

  const { setPrefix } = useContext(StylesContext);

  const contents = fetchContent.data;
  const trending = fetchTrending.data;

  useEffect(() => {
    const prefix = document.querySelector('.center-box').getBoundingClientRect().x;
    setPrefix(prefix);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="homepage">
      <div style={{ backgroundColor: 'white', marginLeft: 100 }}>
        <div className="background" />
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
              <div className="hoz-line" />
            </div>
            {/* eslint-disable-next-line */}
            {contents && contents.slice(10).map((content) => <Card content={content} key={content.id} />)}
            <div className="section">
              <div className="section_title">
                <h1>Member only</h1>
              </div>
              <div className="section_content">
                {trending.map((content) => (
                  <Card content={content} key={content.id} type="small-verc" />
                ))}
              </div>
              <div className="hoz-line" />
            </div>
            {/* eslint-disable-next-line */}
            {contents && contents.slice(-10).map((content) => <Card content={content} key={content.id} />)}
            <div className="section">
              <div className="section_title">
                <h1>For you</h1>
              </div>
              <div className="section_content">
                {trending.map((content) => (
                  <Card content={content} key={content.id} type="small-hoz" />
                ))}
              </div>
              <div className="hoz-line" />
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Home;
