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
    "/uploadVideoStock",
    videoFileUploader.array("files"),
    FileController.uploadVideoStock
);
router.get("/getAllFiles", FileController.getAllFiles);
module.exports = router;
