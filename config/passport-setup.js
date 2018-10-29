const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const opts = require("../config/jwt-config");
passport.use(
  new JwtStrategy(opts.validateOptions, function(jwt_payload, done) {
    console.log(jwt_payload);
    return done(null, true);
  })
);
