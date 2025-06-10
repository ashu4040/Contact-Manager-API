const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://localhost:27017/contactOfMe"
    );
    console.log(`connected to ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectdb;
