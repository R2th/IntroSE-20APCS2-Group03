const fs = require('fs');
const sharp = require('sharp');
const multer = require('multer');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads');
  },
  filename(req, file, cb) {
    // console.log(req.headers.authorization);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2000000, // 2MB
  },
});

const uploadThumbnail = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error();
    }
    const path = req.file.path;
    sharp(path).resize(300, 300, {
      fit: sharp.fit.outside,
    }).png().toBuffer(function(err, buffer) {
      fs.writeFileSync(path, buffer);
    });

    return res.status(200).send({
      filename: req.file.filename,
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

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
  uploadThumbnail,
};
