const mongoose = require("mongoose");
const elementSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports =  mongoose.model("Element", elementSchema)