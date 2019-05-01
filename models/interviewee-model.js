const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const intervieweeSchema = new Schema({
  name: String,
  dateOfBirth: String,
  nativePlace: String,
  location: String,
  qualification: String,
  university: String,
  year: String,
  score: String,
  totalExperience: Number,
  relevantExperience: Number,
  organisation: String,
  designation: String,
  skillSet: String,
  actualCTC: Number,
  fixedComponent: Number,
  variableComponent: Number,
  expectedCTC: Number,
  hike: Number,
  otherOffers: String,
  minNoticePeriod: Number,
  maxNoticePeriod: Number,
  recruiter: String,
  recruiterId: String,
  resume: String,
  status: {
    type: String,
    default: 'inprogress'
  },
  emailId: String,
  phoneNumber: String
});

const Interviewee = mongoose.model("interviewee", intervieweeSchema);

module.exports = Interviewee;
