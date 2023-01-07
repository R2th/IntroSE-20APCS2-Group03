import React, {
  useContext, useMemo,
} from 'react';
import '../components/Comments/style.css';
import useFetch from 'hooks/useFetch';
import { useParams } from 'react-router-dom';
import { parseJwt } from 'utils/token';
import { AuthContext } from './Auth/authContext';

function addChildOneRoot(root, child) {
  if (!root) { return child; }

  let replies;

  if (root.id === child.parent_id) {
    replies = [child, ...root.replies];
  } else {
    replies = root.replies.map((successor) => addChildOneRoot(successor, child));
  }

  return { ...root, replies };
}

function addChildManyRoot(root, child) {
  if (root.length <= 0 || child.parent_id === null) {
    return [child, ...root];
  }
  return root.map((successor) => addChildOneRoot(successor, child));
}

function deleteChildManyRoot(root, childId) {
  if (root.length <= 0) { return []; }

  return root.filter((successor) => successor.id !== childId).map((descendant) => ({ ...descendant, replies: deleteChildManyRoot(descendant.replies, childId) }));
}

function updateChildOneRoot(root, childId, childMessage) {
  if (!root) {
    return root;
  }
  if (root.id === childId) {
    return { ...root, content: childMessage };
  }

  return { ...root, replies: root.replies.map((successor) => updateChildOneRoot(successor, childId, childMessage)) };
}

function updateChildManyRoot(root, childId, childMessage) {
  if (root.length <= 0) {
    return [...root];
  }
  return root.map((successor) => updateChildOneRoot(successor, childId, childMessage));
}

const Context = React.createContext();

export function useComment() {
  return useContext(Context);
}

export function CommentProvider({ children }) {
  const { slug } = useParams();

  const { data, setData } = useFetch(`comments/${slug}`, [], (prev, _data) => _data.data.comment_trees);

  const { token } = useContext(AuthContext);

  if (!token) return null;

  const { username } = parseJwt(token);

  const comments = data;

  const setComments = setData;

  function createLocalComment(newComment) {
    setComments((prevComments) => addChildManyRoot(prevComments, newComment));
  }

  function updateLocalComment(commentId, message) {
    setComments((prevComments) => updateChildManyRoot(prevComments, commentId, message));
  }

  function deleteLocalComment(commentId) {
    setComments((prevComments) => deleteChildManyRoot(prevComments, commentId));
  }

  function getIdForNewComment() {
    const min = 100000;
    const max = 999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // function toggleLocalCommentLike(commentId, addLike, currentUserId) {
  //   setComments((prevComments) => prevComments.map((comment) => {
  //     if (commentId === comment.comment_id) {
  //       if (addLike) {
  //         return {
  //           ...comment,
  //           likedBy: [...comment.likedBy, currentUserId],
  //         };
  //       }
  //       return {
  //         ...comment,
  //         likedBy: comment.likedBy.filter((userId) => userId !== currentUserId),
  //       };
  //     }
  //     return comment;
  //   }));
  // }

  const value = useMemo(() => ({
    slug,
    username,
    comments,
    createLocalComment,
    updateLocalComment,
    deleteLocalComment,
    // toggleLocalCommentLike,
    getIdForNewComment,
  }), [comments]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
