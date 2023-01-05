import React from 'react';
import Comment from './Comment';
import './style.css';

function CommentList({ comments }) {
  return (
    <>
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-stack">
          <Comment comment={comment} />
        </div>
      ))}
    </>
  );
}

export default React.memo(CommentList);
