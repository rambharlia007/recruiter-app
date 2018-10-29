const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
    session:false,
    scope: ['profile']
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google', {
    session: false
}), (req, res) => {
    console.log(res._parsedUrl)
    res.send("res");
});

module.exports = router;