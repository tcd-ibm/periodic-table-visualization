const express = require('express')
const router = express.Router()
const {protectRoute} = require('../middleware/authMiddleware')

const {
  registerUser,
  loginUser,
  getUser,
  verifyUser,
changePassword,
  sendChangePassword,
  logoutUser
} = require('../controllers/userController')
router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/me', protectRoute, getUser)
router.get('/verify/:confirmationCode', verifyUser)
router.put('/ChangePassword/:userId', changePassword);
router.post('/reset', sendChangePassword);

module.exports = router;

