import React from 'react';
import './style.css';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useComment } from '../../contexts/CommentContext';

function CommentSystem() {
  const {
    slug, username, comments, createLocalComment, getIdForNewComment,
  } = useComment();

  // call api to create comment
  const onCommentCreate = (message) => {
    const newComment = {
      id: getIdForNewComment(),
      username,
      story_id: slug,
      parent_id: null,
      content: message,
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    createLocalComment(newComment);
  };

  return (
    <section>
      <CommentForm
        onSubmit={onCommentCreate}
      />
      {comments.length > 0 && (
      <div className="mt-4">
        <CommentList comments={comments} />
      </div>
      )}
    </section>
  );
}

export default CommentSystem;
