const asyncHandler = require('express-async-handler')
const Element = require('../databaseModels/elementModel')
const User = require('../databaseModels/userModel')
// import db from '../config/database'
/**
 * @description GET elements
 * @author Nuoxi Zhang
 * @nuoxiz
 * @route GET /api/elements
 * @access private
 * @param {*} req
 * @param {*} res
 */

const getElements = asyncHandler(async (req, res) => {
  // find all the elements that is related to the user specified by the id
  const elements = await Element.find({ user: req.user.id })
  elements.map(element => { {element._id,
    element.name,
    element.user,
    element.atomic_mass,
    element.atomic_number,
    element.symbol,
    element.description;} })
  res.status(200).json(elements)
})

/**
 * @description Create element
 * @author Nuoxi Zhang
 * @nuoxiz
 * @route POST /api/elements
 * @access private
 * @param {*} req
 * @param {*} res
 */
const createElements = asyncHandler(async (req, res) => {
  // create a new element
  const element = await Element.create({
    name: req.body.name,
    atomic_mass: req.body.am,
    atomic_number: req.body.an,
    symbol: req.body.symbol,
    description: req.body.description,
    user: req.user.id,
    position: req.body.position,
    group: req.body.group
  })
  // send back the new element
  res.status(200).json(element)
})

/**
 * @description DELETE elements specifies by the id
 * @author Nuoxi Zhang
 * @nuoxiz
 * @route DELETE /api/elements:id
 * @access private
 * @param {*} req
 * @param {*} res
 */

const deleteElements = asyncHandler(async (req, res) => {
  // try to find the element specified by the id
  const element = await Element.findById(req.params.id)
  if (!element) {
    res.status(400)
    throw new Error('Element not found')
  }
  const user = await User.findById(req.user.id)
  // check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // make sure the user that logged in matches the user id stored in the element
  if (element.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }
  await Element.findByIdAndDelete(req.params.id)
  res.status(200).json({ id: req.params.id })
})

/**
 * @description Update content of the elements
 * @author Nuoxi Zhang
 * @nuoxiz
 * @route PUT /api/elements/:id
 * @access private
 * @param {*} req
 * @param {*} res
 */

const updateElement = asyncHandler(async (req, res) => {
  // try to find the element specified by the id
  const element = await Element.findById(req.params.id)
  if (!element) {
    res.status(400)
    throw new Error('Element not found')
  }
  const user = await User.findById(req.user.id)
  // check for user
  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // make sure the user that logged in matches the user id stored in the element
  if (element.user.toString() !== user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // new : true means create an Element if it doesn't exist
  // req.body is the new data
  const updatedElement = await Element.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.status(200).json(updatedElement)
})

module.exports = {
  getElements,
  createElements,
  deleteElements,
  updateElement
}
