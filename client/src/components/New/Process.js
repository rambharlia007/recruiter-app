import React, { Component } from "react";
import Header from "../../components/Header";
import $ from "jquery";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.min.js";
import FitmentEvaluationRound from "../Common/FitmentEvaluationRound";
import TechnicalRound from "../Common/TechnicalRound";
import CodeEvaluationRound from "../Common/CodeEvaluationRound";
import CommonService from "../../services/common";

const roundType = {
  fitmentEvaluationRound: 1,
  techRound: 2,
  codeEvaluationRound: 3,
  cdlRound: 4,
  mdRound: 5
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
  assignedTo: "Nidhin",
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

class Process extends Component {
  constructor(props) {
    super(props);
    this.techComponent = React.createRef();
    this.common = new CommonService();
    this.state = {
      currentRoundAssignedTo: "",
      nextRoundAssignedTo: "",
      smsContent: "",
      currentRoundType: roundType.fitmentEvaluationRound,
      fitmentEvaluationRound: fitmentEvaluationRoundData,
      technicalRound: [],
      interviewers: [],
      codeEvaluationRound: null,
      currentUserId: this.common.getLocalStorageData("id"),
      assignedId: ""
    };
  }

  componentDidMount() {
    // const data = [{ id: 1, name: "A1" }, { id: 2, name: "A2" }, { id: 3, name: "A3" }];
    var self = this;
    axios
      .get(`http://localhost:5000/user`, {
        headers: this.common.getTokenHeader()
      })
      .then(function(response) {
        console.log(response.data);
        self.setState({ interviewers: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  addCodeEvaluationRound() {
    this.setState({ codeEvaluationRound: codeEvaluationRoundData });
  }

  addNewRound() {
    var e = this.state.currentRoundType;
    if (e == roundType.techRound) {
      this.addTechnicalRound();
    } else if (e == roundType.codeEvaluationRound) {
      this.addCodeEvaluationRound();
    }
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
    this.setState({ technicalRound: technicalRounds });
  }

  techCallback(data) {
    this.setState({ technicalRound: data });
  }

  fitmentCallback(data) {
    this.setState({ fitmentEvaluationRound: data });
  }

  showOrHideFitmentEvaluationRound(visibleDecider) {
    const fitmentEvaluationRound = this.state.fitmentEvaluationRound;
    fitmentEvaluationRound.bgColor = "";
    fitmentEvaluationRound.isVisible = visibleDecider;
    if (visibleDecider) {
      fitmentEvaluationRound.bgColor = "bg-grey";
      this.showOrHideTechnicalRound(false);
      this.showOrHideCodeEvaluationRound(false);
    }
    this.setState({ fitmentEvaluationRound: fitmentEvaluationRound });
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
      x[index].isVisible = true;
      x[index].bgColor = "bg-grey";
    }
    this.setState({ technicalRound: x });
  }

  showOrHideCodeEvaluationRound(visibleDecider) {
    const codeEvaluationRound = this.state.codeEvaluationRound;
    codeEvaluationRound.bgColor = "";
    codeEvaluationRound.isVisible = visibleDecider;
    if (visibleDecider) {
      codeEvaluationRound.bgColor = "bg-grey";
      this.showOrHideTechnicalRound(false);
      this.showOrHideFitmentEvaluationRound(false);
    }
    this.setState({ codeEvaluationRound: codeEvaluationRound });
  }

  render() {
    const fitmentEvaluationRound = this.state.fitmentEvaluationRound;
    const codeEvaluationRound = this.state.codeEvaluationRound;
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
        <div className="row justify-content-md-center pt15">
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
        </div>
        <div className="row justify-content-md-center">
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
                  <small class="form-text text-muted">{data.assignedTo}</small>
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
                    {fitmentEvaluationRound.assignedTo}
                  </small>
                  <span class="badge badge-secondary1 badge-pill">
                    {fitmentEvaluationRound.rating}
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
            />
            <TechnicalRound
              currentUserId={this.state.currentUserId}
              technicalData={this.state.technicalRound}
              techCallback={this.techCallback.bind(this)}
            />
            {this.state.codeEvaluationRound && (
              <CodeEvaluationRound data={this.state.codeEvaluationRound} />
            )}
          </div>
        </div>

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
                        Technical round
                      </option>
                      <option value={roundType.codeEvaluationRound}>
                        Code evaluation
                      </option>
                      <option value={roundType.fitmentEvaluationRound}>
                        Presentation round
                      </option>
                      <option value={roundType.cdlRound}>CDL Evaluation</option>
                      <option value={roundType.mdRound}>
                        Managing Director Evaluation
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
                    className="btn btn-default btn-sm pull-right"
                    onClick={() => {
                      this.addNewRound();
                    }}
                  >
                    Send Email
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
