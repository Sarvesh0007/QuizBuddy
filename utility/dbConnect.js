const mongoose = require("mongoose");
require("dotenv").config()

async function connectDb() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      () => {
        console.log("MONGODB DATABASE CONNECTED:::");
      }
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDb;
