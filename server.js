const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

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
    "mongodb+srv://rambharlia:11gaei5034@resume-builder-rcgyu.mongodb.net/test?retryWrites=true",
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
    return res.status(200).send(dummy.applicant);
  }
);

app.get("/datatable", (req, res) => {
  console.log("In protected method");
  return res.status(200).send(dummy.applicant);
});

app.listen(5000, () => {
  console.log("app now listening for requests on port 5000");
});
