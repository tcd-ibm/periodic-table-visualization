const mongoose = require("mongoose");
const elementSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    atomic_mass: {
      type: String,
      required: true,
    },
    atomic_number: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: [true, "Please specify the position"],
    },
    group: {
      type: [String],
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Element", elementSchema);
