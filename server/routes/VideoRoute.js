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
router.post("/storyVideo1", videoController.StoryVideo1);
router.post("/testPostAPI", videoController.testPostAPI);
module.exports = router;
