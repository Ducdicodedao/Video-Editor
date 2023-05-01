const express = require("express");

const AuthController = require("../controller/authController");
const router = express.Router();

router.post("/signIn", AuthController.signIn);
router.post("/signup", AuthController.signup);
module.exports = router;
