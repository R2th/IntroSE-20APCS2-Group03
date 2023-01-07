import React, { useState, useContext } from 'react';
import { AuthContext } from 'contexts/Auth/authContext';
import { fullPathAPI } from 'utils/helpers';
import IconBtn from './IconBtn';
import { useComment } from '../../contexts/CommentContext';
import CommentForm from './CommentForm';
import './style.css';

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
});

function Comment({ comment }) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [likedByMe, setLikedByMe] = useState(() => {
    const rate = Math.random();
    if (rate < 0.8) { return false; }
    return true;
  });

  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * (10 - 0 + 1)) + 0);
  const {
    slug,
    username,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
  } = useComment();
  const { token } = useContext(AuthContext);

  // call api to reply comment
  const onCommentReply = async (message) => {
    const newComment = {
      id: 9999,
      username,
      story_id: slug,
      parent_id: comment.id,
      content: message,
      replies: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const postRes = await fetch(fullPathAPI('/comment/'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storyId: slug,
        parentId: newComment.parent_id,
        content: message,
      }),
    });
    const res = await postRes.json();
    if (res.message === 'successful') {
      newComment.id = res.data.new_id;
      setIsReplying(false);
      createLocalComment(newComment);
    }
  };

  // call api to update comment
  const onCommentUpdate = async (message) => {
    const postRes = await fetch(fullPathAPI(`/comment/${comment.id}`), {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
      }),
    });
    const res = await postRes.json();
    if (res.message === 'successful') {
      setIsEditing(false);
      updateLocalComment(comment.id, message);
    }
  };

  // call api to delete comment
  const onCommentDelete = async () => {
    const postRes = await fetch(fullPathAPI(`/comment/${comment.id}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const res = await postRes.json();
    if (res.message === 'successful') {
      deleteLocalComment(comment.id);
    }
  };

  // call api to toogle comment like
  const onToggleCommentLike = () => {
    // toggleLocalCommentLike(comment.comment_id, !likedByMe, username);
    setLikedByMe((prevLikedByMe) => !prevLikedByMe);
    if (likedByMe) {
      setLikeCount((prevLikeCount) => prevLikeCount - 1);
    } else {
      setLikeCount((prevLikeCount) => prevLikeCount + 1);
    }
  };

  return (
    <>
      <div className="comment">
        <div className="header">
          <span className="name">{comment.username}</span>
          <span className="date">
            {comment.updatedAt < comment.createdAt ? 'Edited at ' : ''}
            {dateFormatter.format(Date.parse(comment.updatedAt))}
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
            {likeCount}
          </IconBtn>
          <IconBtn
            onClick={() => setIsReplying((prev) => !prev)}
            isActive={isReplying}
            Icon="icon-comment"
            ariaLabel={isReplying ? 'Cancel Reply' : 'Reply'}
          />
          {comment.username === username && (
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
    </>
  );
}

export default Comment;
