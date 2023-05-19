const express = require("express");

const router = express.Router();
const FileController = require("../controller/fileController");
const videoFileUploader = require("../middleware/videocloudinary");
const imageFileUploader = require("../middleware/imagecloudinary");
const verifyToken = require("../middleware/verifyToken");
router.post(
  "/upload",
  videoFileUploader.array("files"),
  FileController.uploadFile
);
router.post(
  "/uploadImage",
  imageFileUploader.array("files"),
  FileController.uploadFile
);
router.post(
  "/uploadFileStock",
  videoFileUploader.array("files"),
  FileController.uploadFileStock
);

router.get("/getAllFiles", FileController.getAllFiles);
router.post("/getAllVideo", FileController.getAllVideo);
router.post("/getAllAudio", FileController.getAllAudio);
module.exports = router;
