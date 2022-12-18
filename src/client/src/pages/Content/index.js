import * as React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { thumbnail_url } from "../../utils/helpers";
import styles from "./styles.module.scss";
import Navbar from "components/Navbar";
const Content = () => {
  const { id_content } = useParams();
  const navigate = useNavigate();

  const { data } = useFetch(`/posts/${id_content}`, {}, (data) => {
    return data.post.data;
  });

  const post = data;

  React.useEffect(() => {
    var html = document.querySelector("html");
    html.style.setProperty("--featured-img", `url("${thumbnail_url(post)}")`);
    html.style.setProperty("--bg-blend-mode", "multiply");
    html.style.setProperty("background-size", "120% 2000px, 100% auto");
  }, [post]);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.articlesAndSidebar}>
        <div className={styles.postCenter}>
          <div
            className={styles.goBack}
            onClick={() => {
              navigate(-1);
            }}
          >
            Go back
          </div>

          {post && (
            <div className={styles.contentContainer}>
              <div className={styles.header} />
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
        {/* <Sidebar /> */}
      </div>
    </div>
  );
};

export default Content;
