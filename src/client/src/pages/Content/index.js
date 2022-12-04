import * as React from "react";

import { useParams, useNavigate } from "react-router-dom";
import { bypassCORSUrl } from "../../utils/helpers";
import "./styles.scss";

const Content = () => {
  const { id_content } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = React.useState(null);
  const [series, setSeries] = React.useState(null);

  React.useEffect(() => {
    const fetchData = () => {
      fetch(bypassCORSUrl(`https://viblo.asia/api/posts/${id_content}`), {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setPost(data.post.data);
          setSeries(data.series.data);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);

  return (
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
  );
};

export default Content;
