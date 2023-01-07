import React, { useContext } from 'react';
import './style.css';
import { AuthContext } from 'contexts/Auth/authContext';
import { fullPathAPI } from 'utils/helpers';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { useComment } from '../../contexts/CommentContext';

function CommentSystem() {
  const {
    slug, username, comments, createLocalComment,
  } = useComment();
  const { token } = useContext(AuthContext);

  // call api to create comment
  const onCommentCreate = async (message) => {
    const newComment = {
      id: -1,
      username,
      story_id: slug,
      parent_id: null,
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
        parentId: null,
        content: message,
      }),
    });
    const res = await postRes.json();
    if (res.message === 'successful') {
      newComment.id = res.data.new_id;
      createLocalComment(newComment);
    }
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
