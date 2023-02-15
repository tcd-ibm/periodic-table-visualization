const mongoose = require("mongoose");

/**
 * @description A function that connects to MongoDB
 * @author Nuoxi Zhang
 * @nuoxiz
 */
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connect.connection.host}`.green.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
