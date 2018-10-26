const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').GoogleStrategy
const keys = require('./keys');


passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: "/auth/google/redirect'"
}
    , (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
    }))