const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DBURL;

connectDB = () => {
  mongoose.connect(DB_URL);

  mongoose.connection.on("connected", (err) => {
    console.log("connected no problem");
  });
};

module.exports = { connectDB };
