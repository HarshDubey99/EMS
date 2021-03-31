const { urlencoded } = require("express");
const express = require("express");
const app = express();
const port = 80;
const path = require("path");

const db = require("./views/server/server");
const USER = require("./views/server/model");

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
  res.status(200).render("index.pug");
});
// LOGIN TO DASHBOARD
app.post("/", (req, res) => {
  let Email = req.body.email;
  let Password = req.body.password;
  USER.findOne({ email: Email }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      if (decrypt(data.password) === Password) {
        res.send("SUCCESS");
      } else {
        res.redirect("/");
      }
    }
  });
});
// SIGNUP PAGE
app.get("/signup", (req, res) => {
  res.status(200).render("signup.pug");
});

app.post("/signup", (req, res) => {
  let Name = req.body.userName;
  let Email = req.body.userEmail;
  let Password = encrypt(req.body.userPassword);
  let SignedDate = new Date();

  let user = new USER({
    name: Name,
    email: Email,
    password: Password,
    date: SignedDate,
  });

  user.save((err, data) => {
    if (err) {
      console.error(err);
      res.redirect("/signup");
    } else {
      console.log(data, " is saved");
      res.redirect("/");
    }
  });
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
