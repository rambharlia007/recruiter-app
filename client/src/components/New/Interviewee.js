import React, { Component } from "react";
import $ from "jquery";
import Axios from "axios";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import { FilePond, File, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Fa,
  Card,
  CardBody,
  CardTitle
} from "mdbreact";
var faker = require("faker");
const pStyle = {
  padding: "0px"
};

class TempForm extends Component {
  constructor(props) {
    super(props);
    this.tabs = [
      { name: "Personal Details", id: "#tab-1", counter: 1 },
      { name: "Education Details", id: "#tab-2", counter: 2 },
      { name: "Professional Details", id: "#tab-3", counter: 3 },
      { name: "Additional Details", id: "#tab-4", counter: 4 }
    ];
    this.state = {
      open: false,
      modalData: {
        title: "",
        body: ""
      },
      // formData: {
      //   name: "",
      //   dateOfBirth: "",
      //   nativePlace: "",
      //   location: "",
      //   qualification: "",
      //   university: "",
      //   year: "",
      //   score: "",
      //   totalExperience: "",
      //   relevantExperience: "",
      //   organisation: "",
      //   designation: "",
      //   skillSet: "",
      //   actualCTC: "",
      //   fixedComponent: "",
      //   variableComponent: "",
      //   expectedCTC: "",
      //   hike: "",
      //   otherOffers: "",
      //   minNoticePeriod: "",
      //   maxNoticePeriod: ""
      // },
      formData: {
        name: "Ram",
        dateOfBirth: "15-03-1992",
        nativePlace: "Bengaluru",
        location: "KR Puram",
        qualification: "BE",
        university: "BU",
        year: "2015",
        score: "70",
        totalExperience: "3",
        relevantExperience: "3",
        organisation: "DevOn",
        designation: "Developer",
        skillSet: "Mean stack, Dotnet",
        actualCTC: "3",
        fixedComponent: "2",
        variableComponent: "1",
        expectedCTC: "6",
        hike: "3",
        otherOffers: "No",
        minNoticePeriod: "2",
        maxNoticePeriod: "2",
        recruiter: "",
        recruiterId: "",
        file: "",
        resume:""
      },
      interviewers: [],
      activeTab: this.tabs[0]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    var self = this;
    axios
      .get(`/interviewer`)
      .then(function (response) {
        console.log(response.data);
        self.setState({ interviewers: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setRecruiterName() {
    var formData = this.state.formData;
    var recruiterData = this.state.interviewers.filter(
      e => e._id == formData.recruiterId
    )[0];
    formData.recruiter = recruiterData.username;
    this.setState({ formData: formData });
  }

  submitApplicant = () => {
    $("#exampleModalCenter").modal({
      show: true,
      focus: false,
      keyboard: false
    });
    var modalData = { title: "saving...", body: "Save in progress" };
    this.setState({ modalData: modalData });
    this.setRecruiterName();
    var postData = this.state.formData;
    Axios.post("/applicant", postData)
      .then(response => {
        this.setState({
          modalData: { title: "Success", body: "saved successfully." }
        });
      })
      .catch(error => {
        this.setState({
          modalData: { title: "Failed", body: "Internal error, try again." }
        });
      });
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({
      formData
    });
  }

  tabHandler = data => {
    this.setState({ activeTab: data });
  };

  renderListGroup = () => {
    var htmlData = [];
    this.tabs.forEach((v, i) => {
      var act =
        i == 0
          ? "list-group-item list-group-item-action active"
          : "list-group-item list-group-item-action";
      var anchorTag = (
        <a
          class={act}
          data-toggle="list"
          href={this.tabs[i].id}
          role="tab"
          key={i}
          onClick={() => {
            this.tabHandler(v);
          }}
        >
          {v.name}
        </a>
      );
      htmlData.push(anchorTag);
    });

    return htmlData;
  };

  tabMovementHandler = index => {
    console.log("in tab move");
    var currentTab = this.state.activeTab;
    var previousTab = this.tabs[currentTab.counter - index];
    var val = `#myList a[href="${previousTab.id}"]`;
    $(val).tab("show");
    this.setState({ activeTab: previousTab });
  };

  render() {
    const { formData, activeTab } = this.state;
    return (
      <div>
        <div className="row page-title p10">
          <div className="col-sm-8">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item active">
                  <i class="fas fa-home" />
                  <a>&nbsp; Home</a>{" "}
                </li>
                <li class="breadcrumb-item active">
                  <a>New Applicant</a>
                </li>
              </ol>
            </nav>
            <h4>Candidate Evaluation Form</h4>
          </div>
        </div>

        <Row className="justify-content-md-center pt15">
          <div
            class="modal fade"
            id="exampleModalCenter"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLongTitle">
                    {this.state.modalData.title}
                  </h5>
                </div>
                <div class="modal-body">
                  <p>{this.state.modalData.body}</p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary-1"
                    data-dismiss="modal"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    Create new applicant
                  </button>
                  <button
                    type="button"
                    class="btn btn-default"
                    onClick={() => {
                      window.location.href =
                        "/list/applicant";
                    }}
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="col-2">
            <div class="list-group" id="myList" role="tablist">
              {this.renderListGroup()}
            </div>
          </div>
          <Col md="6">
            <Card style={{ minHeight: "650px" }}>
              <CardBody>
                <div class="row">
                  <div class="col-12">
                    <div class="tab-content">
                      <div class="tab-pane active" id="tab-1" role="tabpanel">
                        <form>
                          <p className="h6 text-center">Personal details</p>
                          <div className="col-md-12">
                            <Input
                              type="text"
                              label="Name"
                              name="name"
                              value={formData.name}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="col-md-12">
                            <Input
                              type="text"
                              label="DOB (dd/mm/yyyy)"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="col-md-12">
                            <Input
                              type="text"
                              label="Native Place"
                              name="nativePlace"
                              value={formData.nativePlace}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="col-md-12">
                            <Input
                              type="textarea"
                              label="Current Location and Distance"
                              name="location"
                              value={formData.location}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </form>
                      </div>
                      <div class="tab-pane" id="tab-2" role="tabpanel">
                        <p className="h6 text-center">Education details</p>

                        <div className="row">
                          <div className="col-md-12">
                            <Input
                              type="text"
                              label="Highest Qualification"
                              name="qualification"
                              value={formData.qualification}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="col-md-12">
                            <Input
                              label="University"
                              name="university"
                              value={formData.university}
                              onChange={this.handleInputChange}
                            />
                          </div>

                          <div className="col-md-12">
                            <Input
                              label="Year"
                              name="year"
                              value={formData.year}
                              onChange={this.handleInputChange}
                            />
                          </div>

                          <div className="col-md-12">
                            <Input
                              label="Score %"
                              name="score"
                              value={formData.score}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="tab-3" role="tabpanel">
                        <p className="h6 text-center">Professional details</p>
                        <div className="row">
                          <div className="col-md-6">
                            <Input
                              label="Total Experience"
                              name="totalExperience"
                              value={formData.totalExperience}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <Input
                              label="Relevant Experient"
                              name="relevantExperience"
                              value={formData.relevantExperience}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Input
                              label="Current Organisation"
                              name="organisation"
                              value={formData.organisation}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <Input
                              label="Current Designation"
                              name="designation"
                              value={formData.designation}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <Input
                              label="Skill Set"
                              name="skillSet"
                              value={formData.skillSet}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-3">
                            <Input
                              label="Current CTC"
                              name="actualCTC"
                              value={formData.actualCTC}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="col-md-2">
                            <Input
                              label="Fixed"
                              name="fixedComponent"
                              value={formData.fixedComponent}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="col-md-2">
                            <Input
                              label="Variable"
                              name="variableComponent"
                              value={formData.variableComponent}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="col-md-3">
                            <Input
                              label="Expected salary"
                              name="expectedCTC"
                              value={formData.expectedCTC}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="col-md-2">
                            <Input
                              label="Hike"
                              name="hike"
                              value={formData.hike}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <Input
                              label="Any other offers in hand"
                              name="otherOffers"
                              value={formData.otherOffers}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <Input
                              label="Notice period (Min)"
                              name="minNoticePeriod"
                              value={formData.minNoticePeriod}
                              onChange={this.handleInputChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <Input
                              label="Notice period (Max)"
                              name="maxNoticePeriod"
                              value={formData.maxNoticePeriod}
                              onChange={this.handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane" id="tab-4" role="tabpanel">
                        <div class="form-group row">
                          <small class="col-md-2 form-text text-muted">
                            Resume
                          </small>
                          <div class="col-md-8">
                            <FilePond ref={ref => this.pond = ref}
                              allowMultiple={false}
                              name={"file"}
                              server="http://localhost:5000/upload"
                              onupdatefiles={(fileItem) => {
                                console.log(fileItem);
                                // Set current file objects to this.state
                                const formData = this.state.formData;
                                formData.resume = fileItem[0].filename;
                                this.setState({
                                  formData : formData
                                });
                              }}>
                            </FilePond>
                          </div>
                        </div>
                        <div class="form-group row">
                          <small class="col-md-2 form-text text-muted">
                            Recruiter
                          </small>
                          <div class="col-md-5">
                            <select
                              class="form-control form-control-sm"
                              name="recruiterId"
                              value={formData.recruiterId}
                              onChange={this.handleInputChange}
                            >
                              <option>select interviewer</option>
                              {this.state.interviewers.map((data, index) => {
                                return (
                                  <option value={data._id}>
                                    {data.username}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
              <div className="card-footer">
                {activeTab.counter !== 1 && (
                  <button
                    type="button"
                    class="btn btn-sm btn-default"
                    onClick={() => {
                      this.tabMovementHandler(2);
                    }}
                  >
                    Previous
                  </button>
                )}
                {activeTab.counter !== 4 && (
                  <button
                    type="button"
                    class="btn btn-sm btn-default"
                    onClick={() => {
                      this.tabMovementHandler(0);
                    }}
                  >
                    Next
                  </button>
                )}
                {activeTab.counter == 4 && (
                  <button
                    type="button"
                    class="btn btn-sm btn-default"
                    onClick={() => {
                      this.submitApplicant();
                    }}
                  >
                    Submit
                  </button>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TempForm;
