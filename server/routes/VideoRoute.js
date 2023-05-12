const videoController = require("../controller/videoController");
const express = require("express");

const router = express.Router();

router.post("/trimVideo", videoController.TrimVideo);
router.post("/concatenate", videoController.concatenate);
router.post("/addWatermark", videoController.AddWatermark);
router.post("/turnImagesIntoVideo", videoController.TurnImagesIntoVideo);
router.post("/addProgressBar", videoController.AddProgressBar);
router.post("/addOutro", videoController.AddOutro);
router.post("/convertToGIF", videoController.ConvertToGIF);
router.post("/create2By2VideoWall", videoController.Create2By2VideoWall);
router.post("/splitVideo", videoController.SplitVideo);
router.post("/templateVideo1", videoController.TemplateVideo1);
router.post("/templateVideo2", videoController.TemplateVideo2);
router.post("/templateVideo3", videoController.TemplateVideo3);
router.post("/templateVideo4", videoController.TemplateVideo4);
router.post("/templateVideo5", videoController.TemplateVideo5);
router.post("/testPostAPI", videoController.testPostAPI);

module.exports = router;
