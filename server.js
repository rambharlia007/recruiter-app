const express = require("express");
const authRoutes = require("./routes/auth-routes");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const bodyParser = require("body-parser");

const path = require("path");

const _ = require("underscore");
const User = require("./models/user-model");
const Interviewee = require("./models/interviewee-model");
const InterviewProcess = require("./models/interviewProcess-model");

var async = require("async");
const cors = require("cors");

const app = express();

app.use(cors());

// initialize passport
app.use(passport.initialize());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

var multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

mongoose
  .connect(keys.mongodb.dbURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// set up routes
app.use("/auth", authRoutes);

app.get(
  "/protected/:startDate/:endDate",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Interviewee.find(
      { createdAt: { $gte: req.params.startDate, $lte: req.params.endDate } },
      function(err, interviewers) {
        if (err) res.status(500).send("Internal server error");
        else {
          res.status(200).send(interviewers);
        }
      }
    );
  }
);

app.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({}, function(err, users) {
      if (err) res.status(500).send("Internal server error");
      else {
        res.status(200).send(users);
      }
    });
  }
);

app.get("/interviewer", (req, res) => {
  User.find({}, function(err, users) {
    if (err) res.status(500).send("Internal server error");
    else {
      var data = users.map(d => {
        return { username: d.username, _id: d._id, role: d.role };
      });
      res.status(200).send(data);
    }
  });
});

app.get("/recruiter", (req, res) => {
  User.find({ role: "recruiter" }, function(err, users) {
    if (err) res.status(500).send("Internal server error");
    else {
      var data = users.map(d => {
        return { username: d.username, _id: d._id, role: d.role };
      });
      res.status(200).send(data);
    }
  });
});

app.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id, function(err, users) {
      if (err) res.status(500).send("Internal server error");
      else {
        res.status(200).send(users);
      }
    });
  }
);

app.patch(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, users) {
      if (err) res.status(500).send("Internal server error");
      else {
        res.status(200).send(users);
      }
    });
  }
);

app.get("/applicationByRecruiter/:startDate/:endDate", (req, res) => {
  Interviewee.aggregate(
    getGroupingKeys("$recruiter", req.params.startDate, req.params.endDate),
    (err, data) => {
      res.send(data);
    }
  );
});

function getGroupingKeys(key, startDate, endDate) {
  return [
    { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
    {
      $group: {
        _id: key,
        count: { $sum: 1 }
      }
    }
  ];
}

app.get("/applicationByInterviewer/:startDate/:endDate", (req, res) => {
  async.parallel(
    [
      function(callback) {
        InterviewProcess.aggregate(
          getGroupingKeys(
            "$presentationEvaluationRound.assignedTo",
            req.params.startDate,
            req.params.endDate
          ),
          (err, data) => {
            callback(null, data);
          }
        );
      },
      function(callback) {
        InterviewProcess.aggregate(
          getGroupingKeys(
            "$technicalRound.assignedTo",
            req.params.startDate,
            req.params.endDate
          ),
          (err, data) => {
            callback(null, data);
          }
        );
      },
      function(callback) {
        InterviewProcess.aggregate(
          getGroupingKeys(
            "$codeEvaluationRound.assignedTo",
            req.params.startDate,
            req.params.endDate
          ),
          (err, data) => {
            callback(null, data);
          }
        );
      }
    ],
    function(err, data) {
      var result = [];
      _.each(data, function(val) {
        _.each(val, function(innerData) {
          if (_.isArray(innerData._id)) {
            _.each(innerData._id, function(val) {
              result.push({
                _id: val,
                count: innerData.count
              });
            });
          } else if (innerData._id !== null) {
            result.push(innerData);
          }
        });
      });

      // res.send(result);
      res.send(
        _.mapObject(_.groupBy(result, "_id"), function(val) {
          return _.reduce(
            val,
            function(memo, num) {
              return memo + num.count;
            },
            0
          );
        })
      );
    }
  );
});

app.get("/applicationByStatus/:startDate/:endDate", function(req, res) {
  Interviewee.aggregate(
    getGroupingKeys("$status", req.params.startDate, req.params.endDate),
    (err, data) => {
      res.send(data);
    }
  );
});

app.get(
  "/interviewprocess/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    InterviewProcess.findOne({ intervieweeId: req.params.id }, function(
      err,
      data
    ) {
      if (err) res.status(500).send("Internal server error");
      else {
        res.status(200).send(data);
      }
    });
  }
);

app.put("/Interviewee/:id", (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  Interviewee.updateOne({ _id: id }, { status: status }, (err, data) => {
    res.send("status update done");
  });
});

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
    InterviewProcess.findOneAndUpdate(
      { intervieweeId: data.intervieweeId },
      data,
      {
        upsert: true,
        new: true,
        overwrite: false,
        setDefaultsOnInsert: true
      },
      function(err, user) {
        if (err) {
          res.status(400).send("unable to save to database");
        } else {
          res.send("item saved to database");
        }
      }
    );
  }
);

app.post("/upload", upload.single("file"), function(req, res, next) {
  res.status(200).send({ fileName: req.file.originalname });
});

// serve resume files
app.get("/public/:name", (req, res) => {
  const fileName = req.params.name;
  res.sendFile(path.resolve(__dirname, "public", fileName));
});

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

var server = app.listen(port, () => {
  console.log(`app now listening for requests on port ${port}`);
});
