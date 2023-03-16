const express = require("express");
const router = express.Router();
const {protectRoute} = require("../middleware/authMiddleware")

const {
  registerUser,
  loginUser,
  getUser,
  verifyUser,
  changePassword,
  sendChangePassword
} = require("../controllers/userController");
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protectRoute, getUser);
router.get("/verify/:confirmationCode", verifyUser);
router.put("/reset/:userId", changePassword);
router.post("/reset", sendChangePassword);



module.exports = router;
