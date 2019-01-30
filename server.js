const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

const path = require('path');


const User = require("./models/user-model");
const Interviewee = require("./models/interviewee-model");
const InterviewProcess = require("./models/interviewProcess-model");

const cors = require("cors");

const dummy = require("./dummy.json");
const app = express();

var request = require('request');
var fs = require('fs');

app.use(cors());


// initialize passport
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;


var multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })

mongoose
  .connect(
    keys.mongodb.dbURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// set up routes
app.use("/auth", authRoutes);

app.get(
  "/protected",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("In protected method");
    Interviewee.find({}, function (err, interviewers) {
      if (err) res.status(500).send("Internal server error");
      else {
        res.status(200).send(interviewers);
      }
    });
  }
);

app.get(
  "/user",
  //passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({}, function (err, users) {
      if (err) res.status(500).send("Internal server error");
      else {
        res.status(200).send(users);
      }
    });
  }
);

app.get("/interviewer", (req, res) => {
  User.find({}, function (err, users) {
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
    User.findById(req.params.id, function (err, users) {
      if (err) res.status(500).send("Internal server error");
      else {
        res.status(200).send(users);
      }
    });
  }
);


app.get("/test", (req,res)=>{
  console.log("in test method");
   res.redirect("/list/applicant");
}) 

app.get(
  "/interviewprocess/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    InterviewProcess.findOne({ intervieweeId: req.params.id }, function (err, data) {
      if (err) res.status(500).send("Internal server error");
      else {
        res.status(200).send(data);
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
  "/interviewprocess",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    var data = req.body;
    console.log(data.intervieweeId);
    InterviewProcess.findOneAndUpdate(
      { intervieweeId: data.intervieweeId },
      data,
      {
        upsert: true,
        new: true,
        overwrite: false
      },
      function (err, user) {
        if (err) {
          console.log(err);
          res.status(400).send("unable to save to database");
        } else {
          res.send("item saved to database");
        }
      }
    );
  }
);

// app.post("/upload", (req, res) => {
//   res.status(200).send("upload success");
// })

app.post('/upload', upload.single("file"), function (req, res, next) {
  console.log(req.files);
  console.log(req.file);
  console.log(req.body);
  res.status(200).send("upload success");
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

// serve resume files
app.get('/public/:name', (req,res)=>{
  const fileName = req.params.name;
  res.sendFile(path.resolve(__dirname, 'public', fileName));
})

//Server static assets if in production
if (true || process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    console.log("In file method");
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  }); 
}

app.listen(port, () => {
  console.log(`app now listening for requests on port ${port}`);
});
