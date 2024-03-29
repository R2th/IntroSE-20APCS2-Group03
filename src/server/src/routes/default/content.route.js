const express = require('express');
const router = new express.Router();
const path = require('path');
const upload = require('../../controllers/upload.controller');

router.post('/upload-thumbnail', upload.upload.single('image'), upload.uploadThumbnail);

router.post('/upload-image', upload.upload.single('image'), upload.uploadImage);

router.get('/image/:filename', (req, res) => {
  const {filename} = req.params;
  const dirname = path.resolve();
  const fullFilePath = path.join(dirname, `uploads/${filename}`);
  console.log(fullFilePath);
  return res.sendFile(fullFilePath);
});

module.exports = router;
