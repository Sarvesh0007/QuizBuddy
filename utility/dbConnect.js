const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.yeuld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
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
