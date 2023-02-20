const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler"); // handle exceptions
const User = require("../databaseModels/userModel");

/**
 * @description Regsiter a new user
 * @route  POST /api/users
 * @author Nuoxi Zhang
 * @nuoxiz
 * @access Public
 * @param {*} req
 * @param {*} res
 */
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    res.status(400);
    throw new Error("Please have all the fields filled in");
  }
  //check if user already exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(11);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    })
  }
  else{
    res.status(400)
    throw new Error("Invalid data. Failed to register the user")
  }

  res.json({ message: "Register User" });
});

/**
 * @description Authenticate user
 * @route  POST /api/login
 * @author Nuoxi Zhang
 * @nuoxiz
 * @access Public
 * @param {*} req
 * @param {*} res
 */
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login user" });
});

/**
 * @description Get user data
 * @route  GET /api/users/me
 * @author Nuoxi Zhang
 * @nuoxiz
 * @access Public
 * @param {*} req
 * @param {*} res
 */
const getUser = asyncHandler(async (req, res) => {
  res.json({ message: "Get user data" });
});

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
