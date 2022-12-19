import React, { useState } from "react";
import moment from "moment";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { fullPathImage, thumbnail_url } from "utils/helpers";
import classNames from "classnames";

const MediumCard = ({ content }) => {
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();
  const onClickStory = () => {
    navigate(`story/${content.slug}`);
  };

  return (
    <div
      className="card-container medium-card"
      onClick={onClickStory}
      onMouseMove={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className={classNames("thumbnail", "medium", isHover ? "hover" : "")}
      >
        <img alt="thumbnail" src={thumbnail_url(content)} />
      </div>
      {content && (
        <>
          <div className={classNames("card-medium", isHover ? "hover" : "")}>
            <div className="description">
              <h3 className={classNames("title", isHover ? "hover" : "")}>
                {content.title}
              </h3>
              <p className="contents_short">{content.contents_short}</p>
            </div>
            <div className="footer">
              <img
                alt="avatar"
                className="avatar"
                src={fullPathImage(content.user)}
              />
              <div className="title">
                <div className="name">
                  <span>
                    {content.user && content.user.data.username}&nbsp;
                  </span>
                </div>
                <div className="time">
                  <div>{moment(content.published_at).format("LL")}</div>
                  <div
                    style={{
                      fontWeight: "bold",
                      color: "yellow",
                      textAlign: "center",
                      textShadow:
                        "-0.5px 0 #000, --0.5px 0 #000, 0 -0.5px #000, 0 --0.5px #000,1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000 ",
                    }}
                  >
                    *
                  </div>
                  <div>{content.reading_time} mins read</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MediumCard;
