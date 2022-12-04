import React, { useState, useEffect } from "react";
import { bypassCORSUrl } from "../../utils/helpers";

import "./style.scss";

const Sidebar = () => {
  const [questions, setQuestions] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(bypassCORSUrl("https://viblo.asia/api/questions"))
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setQuestions(data.data);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);

  return (
    <div className="sticky-sidebar">
      <div className="section-title">
        <a href="/questions" className="">
          <h4 className="text-uppercase">Câu hỏi mới nhất</h4>
        </a>
        <hr className="section-title__filler" />
      </div>
      {questions.map((question) => (
        <div key={question.id}>
          {question && (
            <div className="item">
              <a href="/q/3RlL5eZ6LbB" className="link">
                <h4>{question.title}</h4>
              </a>
              <div className="info">
                <div className="stats text-nowrap">
                  <span
                    className="stats-item text-muted w-25"
                    data-tippy=""
                    data-original-title={`Câu trả lời: ${question.answers_count}`}
                  >
                    <i
                      aria-hidden="true"
                      className="stats-item__icon fa fa-reply"
                    ></i>
                    {question.answers_count}
                  </span>
                  <span
                    className="stats-item text-muted w-25"
                    data-tippy=""
                    data-original-title={`Lượt xem: ${question.views_count}`}
                  >
                    <i
                      aria-hidden="true"
                      className="stats-item__icon fa fa-eye"
                    ></i>
                    {question.views_count}
                  </span>
                  <span
                    className="stats-item text-muted w-25"
                    data-tippy=""
                    data-original-title={`Bình luận: ${question.comments_count} comments`}
                  >
                    <i
                      aria-hidden="true"
                      className="stats-item__icon fa fa-comment"
                    ></i>
                    {question.comments_count}
                  </span>
                  <div
                    className="points stats-item text-nowrap"
                    data-tippy=""
                    data-original-title="Điểm"
                  >
                    <div className="carets">
                      <i aria-hidden="true" className="fa fa-caret-up"></i>
                      <i aria-hidden="true" className="fa fa-caret-down"></i>
                    </div>
                    <span className="text-muted">{question.points}</span>
                  </div>
                </div>
              </div>
              <div className="subtitle">
                <a href="*">{question.user && question.user.data.name}</a>
              </div>{" "}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
