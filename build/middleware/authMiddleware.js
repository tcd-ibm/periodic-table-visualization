const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../databaseModels/userModel");

const protectRoute = asyncHandler(async (req, res, next) => {
  var token;

  //check if authorization exist
  // The token will be in the format: "Bearer sd5asd4asda....", thus we check whether
  // it starts with "Bearer" or not
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from the header
      // since Bearer will be at index 0 and the token at index 1
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // get user from token and do not include the password
      // because we put userId into the function: generateToken
      // we can access it when the token is decoded
      
      req.User = await User.findById(decoded.id).select("-password");

      //calling the middleware
      next();
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error("Not authorized")
    }
  }
  if(!token){
    res.status(401)
    throw new Error("Not authorized. Cannot get the JWT token")
  }
});

module.exports = protectRoute;
