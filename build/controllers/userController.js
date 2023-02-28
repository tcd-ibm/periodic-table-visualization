const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler"); // handle exceptions
const User = require("../databaseModels/userModel");
const { sendConfirmationEmail } = require('../email/nodeMailerConfig')
/**
 * @description Regsiter a new user
 * @route  POST /api/users/register
 * @author Nuoxi Zhang
 * @nuoxiz
 * @access Public
 * @param {*} req
 * @param {*} res
 */
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, userName } = req.body;
  if (!firstname || !lastname || !email || !password || !userName) {
    res.status(400)
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
    userName,
    password: hashedPassword,
    confirmationCode: "123"
  });
  const token = generateToken(user._id);
  updateConfirmationCode(user._id, {
    _id: user._id,
    email: user.email,
    status: user.status,
    confirmationCode: token,
  });

  if (user) {
    // send confirmation email
    sendConfirmationEmail(user.firstname, user.email, token);
    res.status(201).json({
      _id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      token: token
    });
  } else {
    res.status(400);
    throw new Error("Invalid data. Failed to register the user");
  }
});

/**
 * @description Authenticate user
 * @route  POST /api/users/login
 * @author Nuoxi Zhang
 * @nuoxiz
 * @access Public
 * @param {*} req
 * @param {*} res
 */
const loginUser = asyncHandler(async (req, res) => {
  // get the email and password from the request body
  const { email, password } = req.body;
  //fetch the user from the database by the email (if the user exists)
  const user = await User.findOne({ email });
  if(!user){
    console.log("User does not exist. Please register")
  }
  if(user){
    if(user.status === "Pending"){
      res.status(401)
      console.log('Pending account: check your mail box and verify your email!')
      throw new Error('Pending Account. Please Verify your email')
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } else {
    res.status(400);
    throw new Error("Invalid Credentials. Please try again.");
  }
});

/**
 * @description Get user data
 * @route  GET /api/users/me
 * @author Nuoxi Zhang
 * @nuoxiz
 * @access Private
 * @param {*} req
 * @param {*} res
 */
const getUser = asyncHandler(async (req, res) => {
  const {_id, firstname, lastname, email} = await User.findById(req.user.id);

  res.status(200).json({id: _id, firstname, lastname, email});
});

/**
 * @description Generate JWT token
 * @author Nuoxi Zhang
 * @nuoxiz
 * @access private
 * @param {*} userId
 * @returns JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

/**
 * @desc verify the user and change user status to "Active"
 * @author Nuoxi Zhang
 * @nuoxiz
 * @route GET /api/users/confirm/:confirmationCode
 * @access private
 */

const verifyUser = asyncHandler(async (req, res) => {
  const code = req.params.confirmationCode;
  // console.log('verifyUser in the backend is called')
  // console.log("parsejwt", parseJwt(code).id)
  const user = await User.findById(parseJwt(code).id);
  if (!user) {
    res.status(400)
    // console.log('user not found')
    throw new Error("User Not Found");
  } else {
    await User.findOneAndUpdate(
      { _id: parseJwt(code).id },
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        status: "Active",
        confirmationCode: code,
      },
      { new: true }
    );
    res.status(200).json({ message: "Updated User Status" });
  }
});

/**
 * @description Update the confirmation code of a user. Used in registerUser
 * @author Nuoxi Zhang 
 * @nuoxiz
 * @access private
 */
const updateConfirmationCode = asyncHandler(async (userId, newData) => {
  try {
    await User.findByIdAndUpdate(userId, newData, { new: true });
  } catch (error) {}
});
/**
 * @description Decode the token passed in to user._id
 * @author Nuoxi Zhang
 * @nuoxiz
 * @param {*} token token of the user
 * @access private
 * @returns The decoded JSON object
 */
function parseJwt(token) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  verifyUser
};
