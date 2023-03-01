const asyncHandler = require('express-async-handler')
const Element = require('../databaseModels/elementModel')
const User = require('../databaseModels/userModel')
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
  const element = await Element.find({ user: req.user.id })
  res.status(200).json(element)
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
  // if (!req.body.title) {
  //   res.status(400)
  //   throw new Error('Please add a title') // override by errorHandler in middleware
  // }
  // create a new element
  console.log('userid: ', req.user.id)
  const element = await Element.create({
    title: req.body.name,
    user: req.user.id
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

const updateElements = asyncHandler(async (req, res) => {
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
  updateElements
}
