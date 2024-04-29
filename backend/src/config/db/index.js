const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/nienluanMV");
    console.log("connect db thanh cong");
  } catch (error) {
    console.log("ko the connect db");
  }
}

module.exports = { connect };
