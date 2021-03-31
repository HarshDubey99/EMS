// CREATING CONNECTION TO DATABASE
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/ems", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ISTABLISH CONNECTION
const db = mongoose.connection;
db.on("error", () => {
  console.log("CONNECTION ERROR!!");
});
db.once("open", () => {
  console.log("CONNECTED TO MONGO DATABASE");
});

module.exports = db;
