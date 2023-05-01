const express = require("express");

const router = express.Router();
const FileController = require("../controller/fileController");
const videoFileUploader = require("../middleware/videocloudinary");
const verifyToken = require("../middleware/verifyToken");
router.post(
  "/upload",
  verifyToken,
  videoFileUploader.array("files"),
  FileController.uploadFile
);
module.exports = router;
