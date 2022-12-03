import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import moment from "moment";

import "./style.scss";
import "./medium.style.scss";
import "./small_hoz.style.scss";
import "./small_verc.style.scss";

const Card = ({ content, type = "fullWidth" }) => {
  const fullPathImage = (user) => {
    if (user && user.data.avatar)
      return `https://images.viblo.asia/avatar/${user.data.avatar}`;
    else return "https://viblo.asia/images/mm.png";
  };

  const thumbnail_url = () => {
    if (!content.slug)
      return "https://miro.medium.com/fit/c/112/112/1*vZJLfVrLT4u_VY1zmAr1_A.png";
    if (content.thumbnail_url) {
      return content.thumbnail_url;
    }
    if (content.tags.data.length > 0) {
      return content.tags.data[0].image;
    }
    return fullPathImage(content.user);
  };

  const navigate = useNavigate();

  switch (type) {
    case "fullWidth":
      return (
        <div
          className="card-container"
          onClick={() => navigate(`content/${content.slug}`)}
        >
          {content && (
            <>
              <div className="card-fullWidth">
                <div className="content">
                  <div className="header">
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
                        <span
                          style={{
                            color: "#959595",
                            fontSize: 14,
                          }}
                        >
                          in&nbsp;
                        </span>
                        <span>{content.user && content.user.data.name}</span>
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
                  <div className="description">
                    <h3 className="title">{content.title}</h3>
                    <div className="contents_short">
                      {content.contents_short}
                    </div>
                  </div>
                </div>
              </div>
              <div className="thumbnail">
                <img alt="thumbnail" src={thumbnail_url()} />
              </div>
            </>
          )}
        </div>
      );
    case "medium":
      return (
        <div
          className="card-container medium-card"
          onClick={() => navigate(`content/${content.slug}`)}
        >
          <div className="thumbnail medium">
            <img alt="thumbnail" src={thumbnail_url()} />
          </div>
          {content && (
            <>
              <div className="card-medium">
                <div className="description">
                  <h3 className="title">{content.title}</h3>
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

    case "small-verc":
      return (
        <div
          className="card-container small-verc-card"
          onClick={() => navigate(`content/${content.slug}`)}
        >
          <div className="thumbnail small-verc">
            <img alt="thumbnail" src={thumbnail_url()} />
          </div>
          {content && (
            <>
              <div className="card-small-verc">
                <div className="description">
                  <h3 className="title">{content.title}</h3>
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
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      );
    case "small-hoz":
      return (
        <div
          className="card-container small-hoz-card"
          onClick={() => navigate(`content/${content.slug}`)}
        >
          <div className="thumbnail small-hoz">
            <img alt="thumbnail" src={thumbnail_url()} />
          </div>
          {content && (
            <>
              <div className="card-small-hoz">
                <div className="description">
                  <h3 className="title">{content.title}</h3>
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
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      );
    default:
      return null;
  }
};

export default Card;
