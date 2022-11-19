const express = require("express");
const router = express.Router();
const path = require("path");

const upload = require("../../controllers/upload");

router.post("/upload-image", upload.upload.single("image"), upload.uploadImage);

router.get("/image/:filename", (req, res) => {
  const { filename } = req.params;
  const dirname = path.resolve();
  const fullFilePath = path.join(dirname, "upload/" + filename);
  console.log(fullFilePath);
  return res.sendFile(fullFilePath);
});

module.exports = router;
