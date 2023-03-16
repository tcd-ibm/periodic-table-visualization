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
router.put("/changePassword/:userId", changePassword);
router.post("/changePassword/:userId", sendChangePassword);



module.exports = router;
