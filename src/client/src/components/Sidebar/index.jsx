import React from 'react';
import { INIT_DATA_CONTENT } from 'utils/const';

import './style.scss';
import useFetch from '../../hooks/useFetch';

function Sidebar() {
  const { data } = useFetch('/api/questions', INIT_DATA_CONTENT, (prev, _data) => {
    if (prev === INIT_DATA_CONTENT) {
      return _data.questions.data;
    } return prev;
  });

  return (
    <div className="sticky-sidebar">
      <div className="section-title">
        <a href="/questions" className="">
          <h4 className="text-uppercase">Câu hỏi mới nhất</h4>
        </a>
        <hr className="section-title__filler" />
      </div>
      {data.map((question) => (
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
                    <i aria-hidden="true" className="stats-item__icon fa fa-reply" />
                    {question.answers_count}
                  </span>
                  <span
                    className="stats-item text-muted w-25"
                    data-tippy=""
                    data-original-title={`Lượt xem: ${question.views_count}`}
                  >
                    <i aria-hidden="true" className="stats-item__icon fa fa-eye" />
                    {question.views_count}
                  </span>
                  <span
                    className="stats-item text-muted w-25"
                    data-tippy=""
                    data-original-title={`Bình luận: ${question.comments_count} comments`}
                  >
                    <i aria-hidden="true" className="stats-item__icon fa fa-comment" />
                    {question.comments_count}
                  </span>
                  <div className="points stats-item text-nowrap" data-tippy="" data-original-title="Điểm">
                    <div className="carets">
                      <i aria-hidden="true" className="fa fa-caret-up" />
                      <i aria-hidden="true" className="fa fa-caret-down" />
                    </div>
                    <span className="text-muted">{question.points}</span>
                  </div>
                </div>
              </div>
              <div className="subtitle">
                <a href="*">{question.user && question.user.data.name}</a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
