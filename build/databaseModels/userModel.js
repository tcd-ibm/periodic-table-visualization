const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter a firstname"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter a lastname"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    userName: {
      type: String,
      required: [true, "Please enter an user name"],
      unique: true
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
// export as "User"
module.exports = mongoose.model("User", userSchema);
