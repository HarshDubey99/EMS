const mongoose = require("mongoose");
const db = require("./server");

// CREATING SCHEMA
let userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: Object,
  date: String,
});

// CREATING MODEL
let USER = mongoose.model("user", userSchema);

module.exports = USER;
