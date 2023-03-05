const express = require('express')
const {
  getElements,
  updateElement,
  deleteElements,
  createElements
} = require('../controllers/elementController')
const router = express.Router()
const { protectRoute } = require('../middleware/authMiddleware')
// linked by the code: app.use('/api/element', require('./routes/elementRoutes')) in dev-server.js
router.get('/', protectRoute, getElements)
router.post('/', protectRoute, createElements)
router.delete('/:id', protectRoute, deleteElements)
router.put('/:id', protectRoute, updateElement)
module.exports = router
