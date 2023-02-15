const express = require('express')
const {getElements, updateElements, deleteElements, createElements} = require('../controllers/elementController')
const router = express.Router();


router.get("/", getElements);
router.post("/", createElements);
router.delete("/:id", deleteElements);
router.put("/:id", updateElements);
module.exports =  router;