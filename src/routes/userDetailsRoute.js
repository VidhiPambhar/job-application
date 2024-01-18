const express = require("express");
const router = express.Router();
const jobDetailsContoller = require("../controllers/jobDetailsContoller");
const isAdmin = require("../middleware/auth");

// Routes
router.post("/create",jobDetailsContoller.userDetails);
router.put("/update/:id",jobDetailsContoller.updateUserDetails);
router.delete("/delete/:id",jobDetailsContoller.deleteUser);
router.get("/all/",jobDetailsContoller.getAllUsersDetailsWithSearch);

module.exports = router;
