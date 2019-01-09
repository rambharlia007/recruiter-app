const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

const User = require("./models/user-model");
const Interviewee = require("./models/interviewee-model");

const cors = require("cors");

const dummy = require("./dummy.json");
const app = express();

app.use(cors());

// initialize passport
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    keys.mongodb.dbURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// set up routes
app.use("/auth", authRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("In protected method");
    Interviewee.find({}, function(err, interviewers) {
      if (err) res.status(500).send("Internal server error");
      else {
        res.status(200).send(interviewers);
      }
    });
  }
);

app.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({}, function(err, users) {
      if (err) res.status(500).send("Internal server error");
      else {
        res.status(200).send(users);
      }
    });
  }
);

app.get("/interviewer", (req, res) => {
  User.find({}, function(err, users) {
    if (err) res.status(500).send("Internal server error");
    else {
      var data = users.map(d => {
        return { username: d.username, _id: d._id };
      });
      res.status(200).send(data);
    }
  });
});

app.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id, function(err, users) {
      if (err) res.status(500).send("Internal server error");
      else {
        res.status(200).send(users);
      }
    });
  }
);

app.post("/applicant", (req, res) => {
  var interviewee = new Interviewee(req.body);
  interviewee
    .save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

app.post(
  "/interviewprocess/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {}
);

app.listen(5000, () => {
  console.log("app now listening for requests on port 5000");
});
