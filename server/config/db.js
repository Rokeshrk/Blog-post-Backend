const mongoose = require('mongoose');
const db = "mongodb://127.0.0.1:27017/AnalogInterview_Rokesh";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.log("error is here");
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;


