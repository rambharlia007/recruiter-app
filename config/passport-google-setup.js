var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: "225239235499-2kcl83lbn7tdga1rhahkg62k5qm9i1ii.apps.googleusercontent.com",
  clientSecret: "2LGCjFhFqsevbzFw4qnXaNIQ",
  callbackURL: "http://localhost:5000/auth/google/redirect"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));