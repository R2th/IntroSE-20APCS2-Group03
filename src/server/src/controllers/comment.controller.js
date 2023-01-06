const {comment} = require('../db/index');
const db = require('../db/index');

const Story = db.story;
const User = db.user;
const Comment = db.comment;

const getAllReplies = async (commentId) => {
  const directReplies = await Comment.findAll({
    where: {
      parent_id: commentId,
    },
    raw: true,
  });
  // Recursion to find all deeper replies
  const promises = directReplies.map(async (reply) => {
    const replies = await getAllReplies(reply.id);
    reply.replies = replies;
    return reply;
  });
  // Wait for all promises to complete
  const replies = await Promise.all(promises);
  return replies;
};

const getCommentsByStoryId = async (req, res) => {
  try {
    const {storyId} = req.params;
    const allComments = await Comment.findAll({
      where: {
        story_id: storyId,
      },
      order: [
        ['createdAt', 'DESC'],
      ],
      raw: true,
    });

    const numComments = allComments.length;
    const roots = allComments.filter((comment) => comment.parent_id == null);

    // Get second-dept comments (first-level replies)
    const promises = roots.map(async (comment) =>{
      const replies = await getAllReplies(comment.id);
      comment.replies = replies;
      return comment;
    });
    // Wait for all promises to complete
    const commentTree = await Promise.all(promises);

    res.status(200).send({
      message: 'successful',
      num_commments: numComments,
      data: {
        comment_trees: commentTree,
      },
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const createComment = async (req, res) => {
  const {userId} = req;
  const {storyId} = req.body;
  let {parentId} = req.body;
  try {
    if (parentId == undefined) {
      parentId = null;
    }
    const comment = await Comment.create({
      ...req.body,
      user_id: userId,
      story_id: storyId,
      parent_id: parentId,
    });
    // Update story's number of comments
    const curStory = await Story.findOne({
      where: {id: storyId},
    });
    await Story.update(
        {num_comments: curStory.num_comments + 1},
        {where: {id: storyId}},
    );

    res.status(200).send({
      message: 'successful',
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateComment = async (req, res) =>{
  try {
    const {commentId} = req.params;
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).send({
        message: 'Comment not found.',
      });
    }

    await comment.update({content: req.body.content});
    res.status(200).send({
      message: 'successful',
      data: comment,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const deleteComment = async (req, res) =>{
  const commentId = req.params.commentId;
  const {storyId} = req.body;
  try {
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).send({
        message: 'Comment not found.',
      });
    }
    await comment.destroy();

    const curStory = await Story.findOne({
      where: {id: storyId},
    });
    await Story.update(
        {num_comments: curStory.num_comments - 1},
        {where: {id: storyId}},
    );

    res.status(200).send({
      message: 'successful',
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = {
  getCommentsByStoryId,
  createComment,
  updateComment,
  deleteComment,
};
