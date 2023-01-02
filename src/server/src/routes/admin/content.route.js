const express = require('express');

const router = new express.Router();
const path = require('path');

const upload = require('../../controllers/upload.controller');

router.post(
    '/admin/upload-image',
    upload.upload.single('image'),
    upload.uploadImage,
);


module.exports = router;
