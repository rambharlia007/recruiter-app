const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const opts = require("../config/jwt-config");
const User = require("../models/user-model");
//const goog = require("../config/passport-google-setup");

// auth login
router.post("/login", (req, res) => {
  let data = req.body;
  var curentUser = {
    username: data.userName,
    socialId: data.socialId,
    imageUrl: data.imageUrl,
    emailId: data.emailId,
    phoneNumber: data.phoneNumber
    //  role: data.role
  };
  User.findOneAndUpdate(
    { emailId: data.emailId },
    curentUser,
    {
      upsert: true,
      new: true,
      overwrite: false
    },
    function(err, user) {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
      } else {
        curentUser.role = user.role;
        const token = jwt.sign(
          curentUser,
          opts.secretOrKey,
          opts.createOptions
        );
        return res.status(200).json({
          message: "Auth Passed",
          token,
          id:user._id
        });
      }
    }
  );
});

// auth logout
router.get("/logout", (req, res) => {
  // handle with passport
  res.send("logging out");
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile"]
  })
);

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false
  }),
  (req, res) => {
    console.log(res._parsedUrl);
    res.send("res");
  }
);

module.exports = router;
