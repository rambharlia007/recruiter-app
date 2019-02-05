const ExtractJwt = require("passport-jwt").ExtractJwt;
module.exports = {
  validateOptions: {
    secretOrKey: "secret",
    issuer: "accounts.devon-recuiter-app.com",
    audience: "devon-recruiter-app.com",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  createOptions: {
    issuer: "accounts.devon-recuiter-app.com",
    audience: "devon-recruiter-app.com",
    expiresIn: 2 * 60 * 60
  },
  secretOrKey: "secret"
};
