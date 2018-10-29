const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./keys');



passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:3000/list/applicant" // "/auth/google/redirect"
}
    , (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    })) 