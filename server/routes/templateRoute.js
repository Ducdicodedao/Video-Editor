const templateController = require("../controller/templateController");
const express = require("express");

const router = express.Router();

router.post("/addTemplate", templateController.addTemplate);
router.get("/getAllTemplate", templateController.getAllTemplate);
router.post("/templateVideo1", templateController.TemplateVideo1);
router.post("/templateVideo2", templateController.TemplateVideo2);
router.post("/templateVideo3", templateController.TemplateVideo3);
router.post("/templateVideo4", templateController.TemplateVideo4);
router.post("/templateVideo5", templateController.TemplateVideo5);
router.post("/templateVideo6", templateController.TemplateVideo6);
router.post("/templateVideo7", templateController.TemplateVideo7);
router.post("/templateVideo8", templateController.TemplateVideo8);
router.post("/templateVide9", templateController.TemplateVideo9);
router.post("/templateVide10", templateController.TemplateVideo10);
router.post("/templateVide11", templateController.TemplateVideo11);
router.post("/testPostAPI", templateController.testPostAPI);
module.exports = router;
