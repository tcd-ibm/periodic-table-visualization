const express = require("express");
const router = express.Router();
const {protectRoute} = require("../middleware/authMiddleware")

const {
  registerUser,
  loginUser,
  getUser,
  verifyUser
} = require("../controllers/userController");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protectRoute, getUser);
router.get("/verify/:confirmationCode", verifyUser);




module.exports = router;
