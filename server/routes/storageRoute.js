const express = require("express");

const router = express.Router();

const storageController = require("../controller/storageController");

router.post("/storeVideo", storageController.StoreVideo);
router.post("/getVideoStorage", storageController.ShowVideoStorage);
module.exports = router;
