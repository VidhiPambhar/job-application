const express = require("express");
const router = express.Router();
const jobDetailsContoller = require("../controllers/jobDetailsContoller");
const isAdmin = require("../middleware/auth");
const auth = require("../middleware/validateToken");
// Routes
router.post("/create",jobDetailsContoller.userDetails);
router.put("/update/:id",auth, isAdmin,jobDetailsContoller.updateUserDetails);
router.delete("/delete/:id",auth, isAdmin,jobDetailsContoller.deleteUser);
router.get("/all/",auth, isAdmin,jobDetailsContoller.getAllUsersDetailsWithSearch);

module.exports = router;
