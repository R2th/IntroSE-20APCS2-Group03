import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import moment from "moment";

import "./style.scss";

const Card = ({ content, type = "fullWidth" }) => {
  const fullPathImage = (user) => {
    return `https://images.viblo.asia/avatar/${user.data.avatar}`;
  };

  const navigate = useNavigate();

  switch (type) {
    case "fullWidth":
      return (
        <div
          className="card-container"
          onClick={() => navigate(`content/${content.slug}`)}
        >
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
                    <span>{content.user.data.username}&nbsp;</span>
                    <span
                      style={{
                        color: "#959595",
                        fontSize: 14,
                      }}
                    >
                      in&nbsp;
                    </span>
                    <span>{content.user.data.name}</span>
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
                <div className="contents_short">{content.contents_short}</div>
              </div>
            </div>
          </div>{" "}
          <div className="thumbnail">
            <img alt="thumbnail" src={content.thumbnail_url} />
          </div>
        </div>
      );
    case "small":
      return <div>Small</div>;
    default:
      return null;
  }
};

export default Card;
