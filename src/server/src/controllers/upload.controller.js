const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    console.log(req.headers.authorization);
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
  // await Score.update(
  //     {image: req.file.filename},
  //     {
  //       where: {
  //         order: req.params.candidate,
  //       },
  //     },
  // );
  res.send({
    filename: req.file.filename,
  });
};

module.exports = {
  upload,
  uploadImage,
};
