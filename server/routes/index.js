const express = require("express");
const router = express.Router();
const AuthRoutes = require("./authRoute");
const FileRoutes = require("./fileRoute");
const VideoRoutes = require("./VideoRoute");
router.use("/auth", AuthRoutes);
router.use("/file", FileRoutes);
router.use("/video", VideoRoutes);
module.exports = router;
