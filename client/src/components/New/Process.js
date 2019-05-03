import React, { Component } from "react";
import Header from "../../components/Header";
import $ from "jquery";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.min.js";
import FitmentEvaluationRound from "../Common/FitmentEvaluationRound";
import TechnicalRound from "../Common/TechnicalRound";
import CodeEvaluationRound from "../Common/CodeEvaluationRound";
import CommonService from "../../services/common";
import PresentationEvaluationRound from "../Common/PresentationEvaluationRound";
import MdCdlEvaluationRound from "../Common/MdCdlEvaluationRound";
import queryString from "query-string";

const roundType = {
  fitmentEvaluationRound: 1,
  techRound: 2,
  codeEvaluationRound: 3,
  cdlRound: 4,
  mdRound: 5,
  presentationEvaluationRound: 6
};

const codeEvaluationRoundData = {
  comments: "",
  technologies: [
    {
      name: "",
      rating: ""
    }
  ],
  isEditable: false,
  isVisible: false,
  name: "Code evaluation round",
  assignedTo: "",
  assignedId: "",
  rating: 0,
  bgColor: "",
  status: "start",
  statusColor: "yellow"
};

const fitmentEvaluationRoundData = {
  suggestion1: "",
  suggestion2: "",
  suggestion3: "",
  isChallengingWorkOrProjects: false,
  isDesignationOrRole: false,
  isFinancialAspects: false,
  motivationalFactorComments: "",
  isWritingBlogs: false,
  isOpenSourceProjects: false,
  isAnyConference: false,
  isTechnicalCertifications: false,
  passionComments: "",
  isEditable: "",
  isVisible: true,
  name: "Fitment evaluation round",
  assignedTo: "",
  assignedId: "",
  rating: 0,
  bgColor: "bg-grey",
  status: "start",
  statusColor: "yellow"
};

const technicalData = {
  rating: 0,
  skills: [],
  comments: "",
  assignedTo: "",
  isEditable: "",
  isVisible: false,
  name: "",
  commentValue: "",
  bgColor: "",
  assignedId: "",
  currentUserId: "",
  disableClass: "",
  status: "start",
  statusColor: "yellow"
};

const presentationRoundData = {
  comments: "",
  contentOrCode: "",
  communication: "",
  energy: "",
  attitude: "",
  skills: [
    {
      name: "",
      rating: ""
    }
  ],
  isEditable: false,
  isVisible: false,
  name: "Presentation evaluation round",
  assignedId: "",
  rating: 0,
  bgColor: "",
  status: "start",
  statusColor: "yellow",
  assignedTo: "",
  rating: 0
};

class Process extends Component {
  constructor(props) {
    super(props);
    this.techComponent = React.createRef();
    this.common = new CommonService();
    this.state = {
      currentRoundAssignedTo: "",
      nextRoundAssignedTo: "",
      smsContent: "",
      currentRoundType: roundType.techRound,
      fitmentEvaluationRound: fitmentEvaluationRoundData,
      presentationEvaluationRound: null,
      cdlRound: null,
      mdRound: null,
      technicalRound: [],
      interviewers: [],
      codeEvaluationRound: null,
      currentUserId: this.common.getLocalStorageData("id"),
      assignedId: "",
      canAddNewRounds: false,
      recruiterId: "",
      intervieweeId: "",
      id: "",
      showLoader: true
    };
  }

  getMdCdlViewModel() {
    return {
      isEditable: "",
      isVisible: false,
      name: "",
      comments: "",
      assignedTo: "",
      bgColor: "",
      status: "start",
      statusColor: "yellow",
      assignedId: ""
    };
  }

  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    var self = this;
    axios
      .get(`/user`, {
        headers: this.common.getTokenHeader()
      })
      .then(function(response) {
        self.setState({ interviewers: response.data });
        self.authenticateFitmentEvaluationRound();
      })
      .catch(function(error) {
        console.log(error);
      });

    axios
      .get(`/interviewprocess/${values.id}`, {
        headers: this.common.getTokenHeader()
      })
      .then(function(response) {
        self.prefillFormData(response.data);
      })
      .catch(function(error) {
        alert("fail");
        console.log(error);
      });
  }

  prefillFormData(data) {
    var fitmentData = fitmentEvaluationRoundData;
    var techData = [];
    var codeEvaluationRound = null;
    var presentationEvaluationRound = null;
    var cdlRound = null;
    var mdRound = null;
    if (data && data.fitmentEvaluationRound) {
      fitmentData = this.getFitmentPrefillData(data.fitmentEvaluationRound);
    }
    if (data && data.technicalRound.length > 0) {
      techData = this.getTechnicalPrefillData(data.technicalRound);
    }
    if (data && data.codeEvaluationRound) {
      codeEvaluationRound = this.getCodeEvaluationPrefillData(
        data.codeEvaluationRound
      );
    }
    if (data && data.presentationEvaluationRound) {
      presentationEvaluationRound = this.getPresentationEvaluationPrefillData(
        data.presentationEvaluationRound
      );
    }
    if (data && data.cdlRound) {
      cdlRound = this.getCdlAndMdPrefillData(data.cdlRound);
    }
    if (data && data.mdRound) {
      mdRound = this.getCdlAndMdPrefillData(data.mdRound);
    }
    this.setState({
      fitmentEvaluationRound: fitmentData,
      techData: techData,
      codeEvaluationRound: codeEvaluationRound,
      presentationEvaluationRound: presentationEvaluationRound,
      cdlRound: cdlRound,
      mdRound: mdRound,
      showLoader: false
    });
  }
  getCdlAndMdPrefillData(data) {
    const x = this.getMdCdlViewModel();
    x.isEditable = data.assignedId == this.state.currentUserId;
    x.disableClass = x.isEditable ? "" : "div-disable";
    x.isVisible = false;
    x.name = data.name;
    x.assignedTo = data.assignedTo;
    x.assignedId = data.assignedId;
    (x.bgColor = ""), (x.status = data.status);
    x.statusColor = data.statusColor;
    x.comments = data.comments;
    return x;
  }
  getPresentationEvaluationPrefillData(data) {
    const x = presentationRoundData;
    x.assignedTo = data.assignedTo;
    x.isEditable = data.assignedId == this.state.currentUserId;
    x.disableClass = x.isEditable ? "" : "div-disable";
    x.assignedId = data.assignedId;
    x.isVisible = false;
    x.skills = data.skills;
    x.contentOrCode = data.contentOrCode;
    x.communication = data.communication;
    x.energy = data.energy;
    x.attitude = data.attitude;
    x.comments = data.comments;
    x.name = data.name;
    x.rating = data.rating;
    x.status = data.status;
    x.statusColor = data.statusColor;
    return x;
  }
  getCodeEvaluationPrefillData(data) {
    const x = codeEvaluationRoundData;
    x.assignedTo = data.assignedTo;
    x.isEditable = data.assignedId == this.state.currentUserId;
    x.disableClass = x.isEditable ? "" : "div-disable";
    x.assignedId = data.assignedId;
    x.isVisible = false;
    x.technologies = data.technologies;
    x.comments = data.comments;
    x.name = data.name;
    x.rating = data.rating;
    x.status = data.status;
    x.statusColor = data.statusColor;
    return x;
  }

  getTechnicalPrefillData(data) {
    var result = this.state.technicalRound;
    data.forEach((value, index) => {
      var x = { ...technicalData };
      x.isEditable = value.assignedId == this.state.currentUserId;
      x.isVisible = false;
      x.assignedTo = value.assignedTo;
      x.assignedId = value.assignedId;
      x.disableClass = x.isEditable ? "" : "div-disable";
      x.name = value.name;
      x.skills = value.skills;
      x.comments = value.comments;
      x.rating = value.rating;
      x.status = value.status;
      x.statusColor = value.statusColor;
      result.push(x);
    });
    return result;
  }

  getFitmentPrefillData(data) {
    var d = this.state.fitmentEvaluationRound;
    d.suggestion1 = data.suggestion1;
    d.suggestion2 = data.suggestion2;
    d.suggestion3 = data.suggestion3;
    d.isChallengingWorkOrProjects = data.isChallengingWorkOrProjects;
    d.isDesignationOrRole = data.isDesignationOrRole;
    d.isFinancialAspects = data.isFinancialAspects;
    d.motivationalFactorComments = data.motivationalFactorComments;
    d.isWritingBlogs = data.isWritingBlogs;
    d.isOpenSourceProjects = data.isOpenSourceProjects;
    d.isAnyConference = data.isAnyConference;
    d.isTechnicalCertifications = data.isTechnicalCertifications;
    d.passionComments = data.passionComments;
    d.isEditable = data.assignedId == this.state.currentUserId;
    d.isVisible = true;
    d.name = data.name;
    d.assignedTo = data.assignedTo;
    d.rating = data.rating;
    d.bgColor = "bg-grey";
    d.status = data.status;
    d.statusColor = data.statusColor;
    return d;
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  authenticateFitmentEvaluationRound() {
    var data = fitmentEvaluationRoundData;
    const values = queryString.parse(this.props.location.search);
    var recruiterId = values.rid;
    var intervieweeId = values.id;
    var recruiter = this.getUserById(recruiterId);
    data.assignedTo = recruiter.username;
    data.assignedId = recruiter._id;
    data.isEditable = recruiter._id == this.state.currentUserId;
    data.disableClass = data.isEditable ? "" : "div-disable";
    this.setState({
      fitmentEvaluationRound: data,
      canAddNewRounds: data.isEditable,
      recruiterId: recruiterId,
      intervieweeId: intervieweeId
    });
  }

  addCodeEvaluationRound() {
    var currentInterviewer = this.getCurrentAssignedInterviewer();
    const data = codeEvaluationRoundData;
    data.assignedTo = currentInterviewer.username;
    data.isEditable = currentInterviewer._id == this.state.currentUserId;
    data.disableClass = data.isEditable ? "" : "div-disable";
    data.assignedId = this.state.assignedId;
    data.isVisible = false;
    this.setState({ codeEvaluationRound: data }, this.saveData);
  }

  addNewRound() {
    var e = this.state.currentRoundType;
    if (e == roundType.techRound) {
      this.addTechnicalRound();
    } else if (e == roundType.codeEvaluationRound) {
      this.addCodeEvaluationRound();
    } else if (e == roundType.presentationEvaluationRound) {
      this.addPresentationEvaluationRound();
    } else if (e == roundType.cdlRound) {
      this.addCdlEvaluationRound();
    } else if (e == roundType.mdRound) {
      this.addMdEvaluationRound();
    }
  }

  addCdlEvaluationRound() {
    var currentInterviewer = this.getCurrentAssignedInterviewer();
    const data = this.getMdCdlViewModel();
    data.assignedTo = currentInterviewer.username;
    data.isEditable = currentInterviewer._id == this.state.currentUserId;
    data.disableClass = data.isEditable ? "" : "div-disable";
    data.assignedId = this.state.assignedId;
    data.isVisible = false;
    data.name = "CDL Evaluation Round";
    this.setState({ cdlRound: data }, this.saveData);
  }
  addMdEvaluationRound() {
    var currentInterviewer = this.getCurrentAssignedInterviewer();
    const data = this.getMdCdlViewModel();
    data.assignedTo = currentInterviewer.username;
    data.isEditable = currentInterviewer._id == this.state.currentUserId;
    data.disableClass = data.isEditable ? "" : "div-disable";
    data.assignedId = this.state.assignedId;
    data.isVisible = false;
    data.name = "MD Evaluation Round";
    this.setState({ mdRound: data }, this.saveData);
  }
  addPresentationEvaluationRound() {
    var currentInterviewer = this.getCurrentAssignedInterviewer();
    const data = presentationRoundData;
    data.assignedTo = currentInterviewer.username;
    data.isEditable = currentInterviewer._id == this.state.currentUserId;
    data.disableClass = data.isEditable ? "" : "div-disable";
    data.assignedId = this.state.assignedId;
    data.isVisible = false;
    this.setState({ presentationEvaluationRound: data }, this.saveData);
  }

  getCurrentAssignedInterviewer() {
    var currentInterviewer = this.state.interviewers.filter(a => {
      return a._id == this.state.assignedId;
    })[0];
    return currentInterviewer;
  }

  getUserById(id) {
    var user = this.state.interviewers.filter(a => {
      return a._id == id;
    })[0];
    return user;
  }

  addTechnicalRound() {
    var technicalRounds = this.state.technicalRound;
    var assignedData = this.state.interviewers.filter(a => {
      return a._id == this.state.assignedId;
    })[0];
    var newTechnicalData = { ...technicalData };
    newTechnicalData.isEditable = assignedData._id == this.state.currentUserId;
    newTechnicalData.isVisible = false;
    newTechnicalData.assignedTo = assignedData.username;
    newTechnicalData.assignedId = this.state.assignedId;
    newTechnicalData.disableClass = newTechnicalData.isEditable
      ? ""
      : "div-disable";
    newTechnicalData.name = `TechnicalRound ${this.state.technicalRound.length +
      1}`;
    technicalRounds.push(newTechnicalData);
    this.setState({ technicalRound: technicalRounds }, this.saveData);
  }

  techCallback(data) {
    this.setState({ technicalRound: data });
  }

  fitmentCallback(data) {
    this.setState({ fitmentEvaluationRound: data });
  }

  codeEvaluationCallback(data) {
    this.setState({ codeEvaluationRound: data });
  }

  mdCdlEvaluationCallback(data, roundTypeId) {
    if (roundTypeId == roundType.cdlRound) this.setState({ cdlRound: data });
    else {
      this.setState({ mdRound: data });
    }
  }

  saveCallback(data, type) {
    if (type == roundType.fitmentEvaluationRound) {
      this.setState({ fitmentEvaluationRound: data }, this.saveData);
    } else if (type == roundType.techRound) {
      this.setState({ technicalData: data }, this.saveData);
    } else if (type == roundType.codeEvaluationRound) {
      this.setState({ codeEvaluationRound: data }, this.saveData);
    } else if (type == roundType.presentationEvaluationRound) {
      this.setState({ presentationEvaluationRound: data }, this.saveData);
    } else if (type == roundType.cdlRound) {
      this.setState({ cdlRound: data }, this.saveData);
    } else if (type == roundType.mdRound) {
      this.setState({ mdRound: data }, this.saveAndUpdateIntervieweeStatus);
    }
  }

  saveAndUpdateIntervieweeStatus() {
    this.saveData();
    var self = this;
    var data = {
      status: this.state.mdRound.status
    };
    axios
      .put(`/interviewee/${this.state.intervieweeId}`, data, {
        headers: this.common.getTokenHeader()
      })
      .then(function(response) {
        console.log("status update done");
      })
      .catch(function(error) {
        alert("fail");
        console.log(error);
      });
  }
  saveData() {
    var self = this;
    axios
      .post(`/interviewprocess`, this.state, {
        headers: this.common.getTokenHeader()
      })
      .then(function(response) {
        alert("saved succesfully");
      })
      .catch(function(error) {
        alert("fail");
        console.log(error);
      });
  }

  showOrHideFitmentEvaluationRound(visibleDecider) {
    const fitmentEvaluationRound = this.state.fitmentEvaluationRound;
    if (fitmentEvaluationRound) {
      fitmentEvaluationRound.bgColor = "";
      fitmentEvaluationRound.isVisible = visibleDecider;
      if (visibleDecider) {
        fitmentEvaluationRound.bgColor = "bg-grey";
        this.showOrHideTechnicalRound(false);
        this.showOrHideCodeEvaluationRound(false);
        this.showOrHidePresentationEvaluationRound(false);
        this.showOrHideCdlRound(false);
        this.showOrHideMdRound(false);
      }
      this.setState({ fitmentEvaluationRound: fitmentEvaluationRound });
    }
  }

  showOrHideTechnicalRound(visibleDecider, index) {
    var x = this.state.technicalRound;
    x.forEach(element => {
      element.isVisible = false;
      element.bgColor = "";
    });
    if (visibleDecider) {
      this.showOrHideCodeEvaluationRound(false);
      this.showOrHideFitmentEvaluationRound(false);
      this.showOrHidePresentationEvaluationRound(false);
      this.showOrHideCdlRound(false);
      this.showOrHideMdRound(false);
      x[index].isVisible = true;
      x[index].bgColor = "bg-grey";
    }
    this.setState({ technicalRound: x });
  }

  showOrHideCodeEvaluationRound(visibleDecider) {
    const codeEvaluationRound = this.state.codeEvaluationRound;
    if (codeEvaluationRound) {
      codeEvaluationRound.bgColor = "";
      codeEvaluationRound.isVisible = visibleDecider;
      if (visibleDecider) {
        codeEvaluationRound.bgColor = "bg-grey";
        this.showOrHideTechnicalRound(false);
        this.showOrHideFitmentEvaluationRound(false);
        this.showOrHidePresentationEvaluationRound(false);
        this.showOrHideCdlRound(false);
        this.showOrHideMdRound(false);
      }
      this.setState({ codeEvaluationRound: codeEvaluationRound });
    }
  }

  showOrHidePresentationEvaluationRound(visibleDecider) {
    const presentationEvaluationRound = this.state.presentationEvaluationRound;
    if (presentationEvaluationRound) {
      presentationEvaluationRound.bgColor = "";
      presentationEvaluationRound.isVisible = visibleDecider;
      if (visibleDecider) {
        presentationEvaluationRound.bgColor = "bg-grey";
        this.showOrHideTechnicalRound(false);
        this.showOrHideFitmentEvaluationRound(false);
        this.showOrHideCodeEvaluationRound(false);
        this.showOrHideCdlRound(false);
        this.showOrHideMdRound(false);
      }
      this.setState({
        presentationEvaluationRound: presentationEvaluationRound
      });
    }
  }

  showOrHideMdRound(visibleDecider) {
    const data = this.state.mdRound;
    if (data) {
      data.bgColor = "";
      data.isVisible = visibleDecider;
      if (visibleDecider) {
        data.bgColor = "bg-grey";
        this.showOrHideTechnicalRound(false);
        this.showOrHideFitmentEvaluationRound(false);
        this.showOrHideCodeEvaluationRound(false);
        this.showOrHidePresentationEvaluationRound(false);
        this.showOrHideCdlRound(false);
      }
      this.setState({
        mdRound: data
      });
    }
  }

  showOrHideCdlRound(visibleDecider) {
    const data = this.state.cdlRound;
    if (data) {
      data.bgColor = "";
      data.isVisible = visibleDecider;
      if (visibleDecider) {
        data.bgColor = "bg-grey";
        this.showOrHideTechnicalRound(false);
        this.showOrHideFitmentEvaluationRound(false);
        this.showOrHideCodeEvaluationRound(false);
        this.showOrHidePresentationEvaluationRound(false);
        this.showOrHideMdRound(false);
      }
      this.setState({
        cdlRound: data
      });
    }
  }

  getJsonData() {
    console.log(JSON.stringify(this.state));
  }

  PresentationEvaluationCallback(data) {
    this.setState({ presentationEvaluationRound: data });
  }

  render() {
    const fitmentEvaluationRound = this.state.fitmentEvaluationRound;
    const codeEvaluationRound = this.state.codeEvaluationRound;
    const presentationRoundData = this.state.presentationEvaluationRound;
    const cdlRound = this.state.cdlRound;
    const mdRound = this.state.mdRound;
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
                  <a>Interview</a>
                </li>
              </ol>
            </nav>
            <h4>Interview</h4>
          </div>
        </div>
        {!this.state.showLoader && (
          <div>
            <div className="row justify-content-md-center pt15">
              {this.state.canAddNewRounds && (
                <div className="col-md-9">
                  <button
                    type="button"
                    class="btn btn-default btn-sm"
                    data-toggle="modal"
                    data-target="#add-round-modal"
                  >
                    Add rounds
                  </button>
                </div>
              )}
            </div>
            <div className="row justify-content-md-center">
              {/* <div>
            <button
              type="button"
              class="btn btn-default btn-sm"
              onClick={() => {
                this.getJsonData();
              }}
            >
              Json
            </button>
          </div> */}
              <div className="col-md-3">
                <ul class="list-group">
                  <li
                    class={
                      "list-group-item d-flex justify-content-between align-items-center " +
                      fitmentEvaluationRound.bgColor
                    }
                  >
                    <span class={"dot " + fitmentEvaluationRound.statusColor} />
                    <small
                      class="form-text text-muted round-small-spec"
                      onClick={() => {
                        this.showOrHideFitmentEvaluationRound(true);
                      }}
                    >
                      {fitmentEvaluationRound.name}
                    </small>
                    <small class="form-text text-muted">
                      {fitmentEvaluationRound.assignedTo}
                    </small>
                    <span class="badge badge-secondary1 badge-pill">
                      {fitmentEvaluationRound.rating}
                    </span>
                  </li>
                  {this.state.technicalRound.map((data, index) => (
                    <li
                      class={
                        "list-group-item d-flex justify-content-between align-items-center " +
                        data.bgColor
                      }
                    >
                      <span class={"dot " + data.statusColor} />
                      <small
                        class="form-text text-muted round-small-spec"
                        onClick={() => {
                          this.showOrHideTechnicalRound(true, index);
                        }}
                      >
                        {data.name}
                      </small>
                      <small class="form-text text-muted">
                        {data.assignedTo}
                      </small>
                      <span class="badge badge-secondary1 badge-pill">
                        {data.rating}
                      </span>
                    </li>
                  ))}
                  {codeEvaluationRound && (
                    <li
                      class={
                        "list-group-item d-flex justify-content-between align-items-center " +
                        codeEvaluationRound.bgColor
                      }
                    >
                      <span class={"dot " + codeEvaluationRound.statusColor} />
                      <small
                        class="form-text text-muted round-small-spec"
                        onClick={() => {
                          this.showOrHideCodeEvaluationRound(true);
                        }}
                      >
                        {codeEvaluationRound.name}
                      </small>
                      <small class="form-text text-muted">
                        {codeEvaluationRound.assignedTo}
                      </small>
                      <span class="badge badge-secondary1 badge-pill">
                        {codeEvaluationRound.rating}
                      </span>
                    </li>
                  )}

                  {presentationRoundData && (
                    <li
                      class={
                        "list-group-item d-flex justify-content-between align-items-center " +
                        presentationRoundData.bgColor
                      }
                    >
                      <span
                        class={"dot " + presentationRoundData.statusColor}
                      />
                      <small
                        class="form-text text-muted round-small-spec"
                        onClick={() => {
                          this.showOrHidePresentationEvaluationRound(true);
                        }}
                      >
                        {presentationRoundData.name}
                      </small>
                      <small class="form-text text-muted">
                        {presentationRoundData.assignedTo}
                      </small>
                      <span class="badge badge-secondary1 badge-pill">
                        {presentationRoundData.rating}
                      </span>
                    </li>
                  )}

                  {cdlRound && (
                    <li
                      class={
                        "list-group-item d-flex justify-content-between align-items-center " +
                        cdlRound.bgColor
                      }
                    >
                      <span class={"dot " + cdlRound.statusColor} />
                      <small
                        class="form-text text-muted round-small-spec"
                        onClick={() => {
                          this.showOrHideCdlRound(true);
                        }}
                      >
                        {cdlRound.name}
                      </small>
                      <small class="form-text text-muted">
                        {cdlRound.assignedTo}
                      </small>
                      <span class="badge badge-secondary1 badge-pill">
                        {cdlRound.rating}
                      </span>
                    </li>
                  )}

                  {mdRound && (
                    <li
                      class={
                        "list-group-item d-flex justify-content-between align-items-center " +
                        mdRound.bgColor
                      }
                    >
                      <span class={"dot " + mdRound.statusColor} />
                      <small
                        class="form-text text-muted round-small-spec"
                        onClick={() => {
                          this.showOrHideMdRound(true);
                        }}
                      >
                        {mdRound.name}
                      </small>
                      <small class="form-text text-muted">
                        {mdRound.assignedTo}
                      </small>
                      <span class="badge badge-secondary1 badge-pill">
                        {mdRound.rating}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              <div className="col-md-6 pb10">
                <FitmentEvaluationRound
                  currentUserId={this.state.currentUserId}
                  fitmentEvaluationRoundData={this.state.fitmentEvaluationRound}
                  fitmentCallback={this.fitmentCallback.bind(this)}
                  saveCallback={this.saveCallback.bind(this)}
                />
                <TechnicalRound
                  currentUserId={this.state.currentUserId}
                  technicalData={this.state.technicalRound}
                  techCallback={this.techCallback.bind(this)}
                  saveCallback={this.saveCallback.bind(this)}
                />
                {this.state.codeEvaluationRound && (
                  <CodeEvaluationRound
                    data={this.state.codeEvaluationRound}
                    saveCallback={this.saveCallback.bind(this)}
                    codeEvaluationCallback={this.codeEvaluationCallback.bind(
                      this
                    )}
                  />
                )}
                {this.state.presentationEvaluationRound && (
                  <PresentationEvaluationRound
                    data={this.state.presentationEvaluationRound}
                    saveCallback={this.saveCallback.bind(this)}
                    PresentationEvaluationCallback={this.PresentationEvaluationCallback.bind(
                      this
                    )}
                  />
                )}
                {this.state.cdlRound && (
                  <MdCdlEvaluationRound
                    data={this.state.cdlRound}
                    saveCallback={this.saveCallback.bind(this)}
                    mdCdlEvaluationCallback={this.mdCdlEvaluationCallback.bind(
                      this
                    )}
                    roundTypeId={roundType.cdlRound}
                  />
                )}
                {this.state.mdRound && (
                  <MdCdlEvaluationRound
                    data={this.state.mdRound}
                    saveCallback={this.saveCallback.bind(this)}
                    mdCdlEvaluationCallback={this.mdCdlEvaluationCallback.bind(
                      this
                    )}
                    roundTypeId={roundType.mdRound}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        <div class="modal" id="add-round-modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Add New Round</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <small class="form-text text-muted">Next Round</small>
                    <select
                      class="form-control"
                      name="currentRoundType"
                      value={this.state.currentRoundType}
                      onChange={e => {
                        this.handleInputChange(e);
                      }}
                    >
                      <option value={roundType.techRound}>
                        Technical Round
                      </option>
                      <option value={roundType.codeEvaluationRound}>
                        Code Evaluation Round
                      </option>
                      <option value={roundType.presentationEvaluationRound}>
                        Presentation Round
                      </option>
                      <option value={roundType.cdlRound}>CDL Round</option>
                      <option value={roundType.mdRound}>
                        Managing Director Round
                      </option>
                    </select>
                  </div>
                  <div class="form-group">
                    <small class="form-text text-muted">Assign to</small>
                    <select
                      class="form-control"
                      name="assignedId"
                      value={this.state.assignedId}
                      onChange={e => {
                        this.handleInputChange(e);
                      }}
                    >
                      <option>select interviewer</option>
                      {this.state.interviewers.map((data, index) => {
                        return (
                          <option value={data._id}>{data.username}</option>
                        );
                      })}
                    </select>
                    <pre>{this.state.assignedId}</pre>
                  </div>
                  <div class="form-group">
                    <small class="form-text text-muted">Message</small>
                    <textarea class="form-control" rows="2" />
                  </div>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    className="btn btn-default btn-sm pull-right"
                    onClick={() => {
                      this.addNewRound();
                    }}
                  >
                    add round
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Process;
