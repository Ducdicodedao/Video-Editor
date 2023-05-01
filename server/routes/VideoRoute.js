const videoController = require("../controller/videoController");
const express = require("express");

const router = express.Router();

router.post("/trimVideo", videoController.TrimVideo);
module.exports = router;
