const express = require('express');

const router = new express.Router();
const verifyToken = require('../../middleware/isLogin');

const commentController = require('../../controllers/comment.controller');

router.get('/comments/', commentController.getCommentsByStoryId);
router.post('/comment/', verifyToken, commentController.createComment);
router.put('/comment/:commentId', verifyToken, commentController.updateComment);
router.delete('/comment/:commentId', verifyToken, commentController.deleteComment);

module.exports = router;
