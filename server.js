const express = require('express');
const authRoutes = require('./routes/auth-routes');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
var cors = require('cors')



const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }



const app = express();

app.use(cors(corsOptions));

// initialize passport
app.use(passport.initialize());

// connect to mongodb
// mongoose.connect(keys.mongodb.dbURI, () => {
//     console.log('connected to mongodb');
// });

// set up routes
app.use('/auth', authRoutes);

// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.listen(5000, () => {
    console.log('app now listening for requests on port 5000');
});