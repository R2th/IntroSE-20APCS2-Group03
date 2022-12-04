import axios from "axios";
import Sidebar from "components/Sidebar";
import * as React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { API_STATUS_SUCCESS } from "utils/const";
import { fullPathAPI, thumbnail_url } from "../../utils/helpers";
import "./styles.scss";

const Content = () => {
  const { id_content } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = React.useState({});
  const [series, setSeries] = React.useState({});

  React.useEffect(() => {
    var html = document.querySelector("html");
    html.style.setProperty("--featured-img", `url("${thumbnail_url(post)}")`);
    html.style.setProperty("--bg-blend-mode", "multiply");
    html.style.setProperty("background-size", "120% 2000px, 100% auto");
  }, [post]);

  React.useEffect(() => {
    const fetchData = async () => {
      const { data, status } = await axios(fullPathAPI(`/posts/${id_content}`));
      if (status === API_STATUS_SUCCESS) {
        setPost(data.post.data);
        setSeries(data.series.data);
      } else {
        console.error(status);
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="articles-and-sidebar">
        <div className="post-center">
          <div
            className="go-back"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go back
          </div>

          {post && (
            <div className="content-container">
              <div className="header"></div>
              <h1>{post.title}</h1>
              <zero-md>
                <script type="text/markdown">
                  {/* <template>
                <link
                  rel="stylesheet"
                  href={`${process.env.PUBLIC_URL}/zero.css`}
                />
              </template> */}
                  {post.contents}
                </script>
              </zero-md>
            </div>
          )}
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Content;
