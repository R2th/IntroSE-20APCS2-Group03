import React, {
  useContext, useMemo, useState,
} from 'react';

import '../components/Comments/style.css';

const Context = React.createContext();

export function useComment() {
  return useContext(Context);
}

// call api to get slug
const slug = 123;

// call api to get username
const username = 111;

// call api to get comment from the given slug
const commentData = [
  {
    comment_id: 1,
    username: 111,
    story_id: 123,
    parent_id: null,
    content: 'Breaking Bad is the GOAT of TV shows',
    likedBy: [333, 444],
    createdAt: new Date('03 Jan 2022 05:30:00 GMT+7'),
  },
  {
    comment_id: 2,
    username: 222,
    story_id: 123,
    parent_id: null,
    content: 'Number 1 is definitely Wednesday',
    likedBy: [],
    createdAt: new Date('02 Jan 2022 07:30:15 GMT+7'),
  },
  {
    comment_id: 3,
    username: 333,
    story_id: 123,
    parent_id: 1,
    content: 'Yeah bro, i am down with you',
    likedBy: [111],
    createdAt: new Date('04 Jan 2022 08:15:30 GMT+7'),
  },
  {
    comment_id: 4,
    username: 444,
    story_id: 123,
    parent_id: 1,
    content: 'That is right, if Breaking Bad was top 2, no TV show would be top 1',
    likedBy: [111],
    createdAt: new Date('05 Jan 2022 17:00:45 GMT+7'),
  },
  {
    comment_id: 5,
    username: 555,
    story_id: 123,
    parent_id: 2,
    content: 'Are you crazy, you motherfucker. That movie is shitty as fuck',
    likedBy: [],
    createdAt: new Date('03 Jan 2022 23:59:59 GMT+7'),
  },
  {
    comment_id: 6,
    username: 111,
    story_id: 123,
    parent_id: 3,
    content: 'Thank you',
    likedBy: [333],
    createdAt: new Date('06 Jan 2022 11:30:18 GMT+7'),
  },
];

export function CommentProvider({ children }) {
  const [comments, setComments] = useState(commentData);

  const commentsByParentId = useMemo(() => {
    const group = {};
    comments.forEach((comment) => {
      if (comment.parent_id === null) {
        group[-1] ||= [];
        group[-1].push(comment);
      } else {
        group[comment.parent_id] ||= [];
        group[comment.parent_id].push(comment);
      }
    });
    return group;
  }, [comments]);

  // useEffect(() => {
  //   if (commentData != null && commentData.length > 0) {
  //     setComments(commentData);
  //   }
  // }, [commentData]);

  function getReplies(parentId) {
    return commentsByParentId[parentId];
  }

  function createLocalComment(newComment) {
    setComments((prevComments) => ([newComment, ...prevComments]));
  }

  function updateLocalComment(commentId, message) {
    setComments((prevComments) => prevComments.map((comment) => {
      if (comment.comment_id === commentId) {
        return { ...comment, content: message };
      }
      return comment;
    }));
  }

  function deleteLocalComment(commentId) {
    setComments((prevComments) => prevComments.filter((comment) => comment.comment_id !== commentId));
  }

  function getIdForNewComment() {
    const currentId = commentData.map((comment) => comment.comment_id);
    const newId = Math.max(...currentId) + 1;
    return newId;
  }

  function toggleLocalCommentLike(commentId, addLike, currentUserId) {
    setComments((prevComments) => prevComments.map((comment) => {
      if (commentId === comment.comment_id) {
        if (addLike) {
          return {
            ...comment,
            likedBy: [...comment.likedBy, currentUserId],
          };
        }
        return {
          ...comment,
          likedBy: comment.likedBy.filter((userId) => userId !== currentUserId),
        };
      }
      return comment;
    }));
  }

  const value = useMemo(() => {
    console.log('okie');
    return {
      story: { slug, username },
      rootComments: commentsByParentId[-1],
      getReplies,
      createLocalComment,
      updateLocalComment,
      deleteLocalComment,
      toggleLocalCommentLike,
      getIdForNewComment,
    };
  }, [comments]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
