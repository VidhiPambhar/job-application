const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// const auth = require("../middleware/auth");

// Routes
router.post("/login",authController.login);
router.post("/logout",authController.logout);


module.exports = router;
