import React, { useContext, useEffect } from 'react';

import Card from 'components/Card';
import Sidebar from 'components/Sidebar';

import { INIT_DATA_CONTENT } from 'utils/const';

import { StylesContext } from 'contexts/Styles/stylesContext';
import useFetch from 'hooks/useFetch';

import './style.scss';

function Home() {
  const fetchContent = useFetch('/story/all/10', INIT_DATA_CONTENT);
  const fetchTrending = useFetch('/story/newest/10', INIT_DATA_CONTENT);

  const { setPrefix } = useContext(StylesContext);

  const contents = fetchContent.data;
  const trending = fetchTrending.data;

  useEffect(() => {
    const prefix = document.querySelector('.center-box').getBoundingClientRect().x;
    setPrefix(prefix);
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
                  <Card key={content.id} content={content} type="medium" />
                ))}
              </div>
              <div className="hoz-line" />
            </div>
            {contents && contents.slice(10).map((content) => <Card key={content.id} content={content} />)}
            <div className="section">
              <div className="section_title">
                <h1>Member only</h1>
              </div>
              <div className="section_content">
                {trending.map((content) => (
                  <Card key={content.id} content={content} type="small-verc" />
                ))}
              </div>
              <div className="hoz-line" />
            </div>
            {contents && contents.slice(-10).map((content) => <Card key={content.id} content={content} />)}
            <div className="section">
              <div className="section_title">
                <h1>For you</h1>
              </div>
              <div className="section_content">
                {trending.map((content) => (
                  <Card key={content.id} content={content} type="small-hoz" />
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
