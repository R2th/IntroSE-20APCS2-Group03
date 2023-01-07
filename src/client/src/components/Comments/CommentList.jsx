import React, { useState } from 'react';
import './style.css';
import Comment from './Comment';

function CommentList({ comments }) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  return (
    comments.map((comment) => (
      <div key={comment.id} className="comment-stack">
        <Comment comment={comment} />
        {comment.replies.length > 0 && (
          <>
            <div
              className={`nested-comments-stack ${
                areChildrenHidden ? 'hide' : ''
              }`}
            >
              <button
                type="button"
                className="collapse-line"
                aria-label="Hide Replies"
                onClick={() => setAreChildrenHidden(true)}
              />
              <div className="nested-comments">
                <CommentList comments={comment.replies} />
              </div>
            </div>
            <button
              type="button"
              className={`btn mt-1 ${!areChildrenHidden ? 'hide' : ''}`}
              onClick={() => setAreChildrenHidden(false)}
            >
              Show Replies
            </button>
          </>
        )}
      </div>
    ))
  );
}

export default CommentList;
