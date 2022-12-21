const multer = require('multer');
const { Score } = require('../db/index');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2000000, // 2MB
  },
});

const uploadImage = async (req, res) => {
  await Score.update(
    { image: req.file.filename },
    {
      where: {
        order: req.params.candidate,
      },
    },
  );
  res.send('file uploaded successfully');
};

module.exports = {
  upload,
  uploadImage,
};
