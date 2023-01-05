import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useComment } from '../../contexts/CommentContext';
import './style.css';

function CommentSystem() {
  const {
    story, rootComments, createLocalComment, getIdForNewComment,
  } = useComment();

  // call api to create comment
  const onCommentCreate = (message) => {
    const newComment = {
      comment_id: getIdForNewComment(),
      username: story.username,
      story_id: story.slug,
      parent_id: null,
      content: message,
      likedBy: [],
      createdAt: new Date(),
    };
    createLocalComment(newComment);
  };
  return (
    <section>
      <CommentForm
        onSubmit={onCommentCreate}
      />
      {rootComments != null && rootComments.length > 0 && (
      <div className="mt-4">
        <CommentList comments={rootComments} />
      </div>
      )}
    </section>
  );
}

export default CommentSystem;
