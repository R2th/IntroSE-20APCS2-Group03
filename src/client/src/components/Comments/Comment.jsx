import React, { useState } from 'react';
import IconBtn from './IconBtn';
import { useComment } from '../../contexts/CommentContext';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import './style.css';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function Comment({ comment }) {
  const [areChildrenHidden, setAreChildrenHidden] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    story,
    getReplies,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    toggleLocalCommentLike,
    getIdForNewComment,
  } = useComment();

  const childComments = getReplies(comment.comment_id);

  const likedByMe = comment.likedBy.includes(story.username);

  // call api to reply comment
  const onCommentReply = (message) => {
    const newComment = {
      comment_id: getIdForNewComment(),
      username: story.username,
      story_id: story.slug,
      parent_id: comment.comment_id,
      content: message,
      likedBy: [],
      createdAt: new Date(),
    };
    setIsReplying(false);
    createLocalComment(newComment);
  };

  // call api to update comment
  const onCommentUpdate = (message) => {
    setIsEditing(false);
    updateLocalComment(comment.comment_id, message);
  };

  // call api to delete comment
  const onCommentDelete = () => {
    deleteLocalComment(comment.comment_id);
  };

  // call api to toogle comment like
  const onToggleCommentLike = () => {
    toggleLocalCommentLike(comment.comment_id, !likedByMe, story.username);
  };

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{comment.username}</span>
          <span className="date">
            {dateFormatter.format(Date.parse(comment.createdAt))}
          </span>
        </div>
        {isEditing ? (
          <CommentForm
            initialValue={comment.content}
            onSubmit={onCommentUpdate}
          />
        ) : (
          <div className="message">{comment.content}</div>
        )}
        <div className="footer">
          <IconBtn
            onClick={onToggleCommentLike}
            Icon={likedByMe ? 'icon-upvote_fill' : 'icon-upvote'}
            ariaLabel={likedByMe ? 'Unlike' : 'Like'}
          >
            {comment.likedBy.length}
          </IconBtn>
          <IconBtn
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            Icon="icon-comment"
            ariaLabel={isReplying ? 'Cancel Reply' : 'Reply'}
          />
          {comment.username === story.username && (
            <>
              <IconBtn
                onClick={() => setIsEditing((prev) => !prev)}
                isActive={isEditing}
                Icon="icon-edit"
                ariaLabel={isEditing ? 'Cancel Edit' : 'Edit'}
              />
              <IconBtn
                onClick={onCommentDelete}
                Icon="icon-delete"
                ariaLabel="Delete"
                color="red"
              />
            </>
          )}
        </div>
      </div>
      {isReplying && (
        <div className="mt-1 ml-3">
          <CommentForm
            onSubmit={onCommentReply}
          />
        </div>
      )}
      {childComments?.length > 0 && (
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
              <CommentList comments={childComments} />
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
    </>
  );
}

export default Comment;
