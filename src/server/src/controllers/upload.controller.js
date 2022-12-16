const multer = require("multer");
const { Score } = require("../db/index");

const storage = multer.diskStorage({
  destination: "upload/",
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname + ".md");
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2000000, //2MB
  },
});

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
