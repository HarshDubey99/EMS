const { urlencoded } = require("express");
const express = require("express");
const app = express();
const port = 80;
const path = require("path");
const db = require("./views/server/server");
const { encrypt, decrypt } = require("./static/main");
const { Console } = require("console");

app.use("/static", express.static("static"));
app.use(express.urlencoded());
// Set the template engine as pug
app.set("view engine", "pug");

// Set the view directory
app.set("views", path.join(__dirname, "views"));

// LOGIN PAGE
app.get("/", (req, res) => {
  db.on("error", console.error.bind(console, "CONNECTION ERROR"));
  db.once("open", () => {
    console.log("CONNECTED TO MONGO DATABASE");
  });
  // res.status(200).render("index.pug");
});
// SIGNUP PAGE
app.get("/signup", (req, res) => {
  res.status(200).render("signup.pug");
});

app.post("/signup", (req, res) => {
  let Name = req.body.userName;
  let Email = req.body.userEmail;
  let Password = encrypt(req.body.userPassword);
});
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
