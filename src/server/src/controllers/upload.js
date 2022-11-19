const multer = require("multer");
const { Score } = require("../db/index");

const storage = multer.diskStorage({
  destination: "upload/",
  filename: function (req, file, cb) {
    if (req.params.candidate) {
      cb(null, file.originalname);
    } else {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix);
    }
  },
});

const upload = multer({ storage: storage });

const uploadImage = async (req, res) => {
  await Score.update(
    { image: req.file.filename },
    {
      where: {
        order: req.params.candidate,
      },
    }
  );
  res.send("file uploaded successfully");
};

module.exports = {
  upload,
  uploadImage,
};
