const mongoose = require("mongoose");
const process = require("process");
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/legaltech";
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected!!");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
  }
};

module.exports = connectToMongoDB;
