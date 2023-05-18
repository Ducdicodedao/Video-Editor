const videoController = require("../controller/videoController");
const express = require("express");

const router = express.Router();

router.post("/render", videoController.renderVideo);
router.post("/trimVideo", videoController.TrimVideo);
router.post("/concatenate", videoController.concatenate);
router.post("/addWatermark", videoController.AddWatermark);
router.post("/templateVideo1", videoController.TemplateVideo1);
router.post("/templateVideo2", videoController.TemplateVideo2);
router.post("/templateVideo3", videoController.TemplateVideo3);
router.post("/templateVideo4", videoController.TemplateVideo4);
router.post("/templateVideo5", videoController.TemplateVideo5);
router.post("/templateVideo6", videoController.TemplateVideo6);
router.post("/templateVideo7", videoController.TemplateVideo7);
router.post("/templateVideo8", videoController.TemplateVideo8);
router.post("/testPostAPI", videoController.testPostAPI);

module.exports = router;
