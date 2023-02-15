const asyncHandler = require('express-async-handler')
/**
 * @description GET elements
 * @route GET /api/elements
 * @access private
 * @param {*} req 
 * @param {*} res 
 */

const getElements = asyncHandler( async (req, res) =>{
    res.status(200).json({ message: "GET element!!!!!" });
}
)
/**
 * @description Create elements 
 * @route POST /api/elements
 * @access private
 * @param {*} req 
 * @param {*} res 
 */

const createElements = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text"); // which return a HTML page
  }
  res.status(200).json({ message: "CREATE element!!!!!" });
})

/**
 * @description DELETE elements specifies by the id
 * @route DELETE /api/elements:id
 * @access private
 * @param {*} req 
 * @param {*} res 
 */

const deleteElements =asyncHandler(async (req, res) => {
  res.status(200).json({ message: `DELETE ELEMENT ${req.params.id}` });
})

/**
 * @description Update content of the elements
 * @route PUT /api/elements/:id
 * @access private
 * @param {*} req 
 * @param {*} res 
 */

const updateElements = asyncHandler( async (req, res) => {
  res.status(200).json({ message: `UPDATE ELEMENT ${req.params.id}` });
})

module.exports = {
    getElements,
    createElements,
    deleteElements,
    updateElements
}