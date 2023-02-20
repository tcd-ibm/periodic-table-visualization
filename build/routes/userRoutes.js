const express = require("express");
const router = express.Router();
const {protectRoute} = require("../middleware/authMiddleware")

const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/userController");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protectRoute, getUser);

module.exports = router;
