import React, { Component } from "react";
import $ from "jquery";
import Axios from "axios";
import "bootstrap/dist/js/bootstrap.min.js";
import "../../../node_modules/font-awesome/css/font-awesome.css";

const statusData = {
  inprogress: { color: "orange", value: "inprogress" },
  ready: { color: "yellow", value: "ready" },
  onhold: { color: "lightgreen", value: "onhold" },
  rejected: { color: "red", value: "rejected" },
  approved: { color: "green", value: "approved" }
};

class PresentationEvaluationRound extends Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  changeStatus(data, index) {
    const currentState = this.state;
    currentState.status = data.value;
    currentState.statusColor = data.color;
    this.setState(currentState);
    this.props.PresentationEvaluationCallback(currentState);
  }

  componentDidMount() {}

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  addNewSkills() {
    const skills = this.state.skills;
    skills.push({ name: "", rating: "" });
    this.setState({ skills: skills });
  }

  saveChanges() {
    this.props.saveCallback(this.state, 6);
  }

  handleTechInputChange(event, index) {
    const data = this.state.skills;
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    data[index][name] = value;
    this.setState({
      skills: data
    });
  }

  render() {
    return (
      this.props.data.isVisible && (
        <div class="card">
          <div className={"card-body " + this.props.data.disableClass}>
            <h5 class="card-title">Presentation Evaluation Round</h5>
            {this.state.skills.map((data, index) => {
              return (
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <small class="form-text text-muted">Skills</small>
                    <input
                      type="text"
                      class="form-control form-control-sm"
                      name="name"
                      value={data.name}
                      onChange={e => {
                        this.handleTechInputChange(e, index);
                      }}
                    />
                  </div>
                  <div class="form-group col-md-4">
                    <small class="form-text text-muted">Rating</small>
                    <select
                      class="form-control form-control-sm"
                      name="rating"
                      value={data.rating}
                      onChange={e => {
                        this.handleTechInputChange(e, index);
                      }}
                    >
                      <option selected>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
              );
            })}
            <div className="row col-md-4 btn-add-tech">
              <button
                type="button"
                className="btn btn-default btn-sm"
                onClick={() => {
                  this.addNewSkills();
                }}
              >
                Add Skills
              </button>
            </div>
            <div class="form-group">
              <small class="form-text text-muted">Content/Code</small>
              <textarea
                class="form-control"
                rows="2"
                name="contentOrCode"
                value={this.state.contentOrCode}
                onChange={e => {
                  this.handleInputChange(e);
                }}
              />
            </div>
            <div class="form-group">
              <small class="form-text text-muted">Communication</small>
              <textarea
                class="form-control"
                rows="2"
                name="communication"
                value={this.state.communication}
                onChange={e => {
                  this.handleInputChange(e);
                }}
              />
            </div>
            <div class="form-group">
              <small class="form-text text-muted">Energy</small>
              <textarea
                class="form-control"
                rows="2"
                name="energy"
                value={this.state.energy}
                onChange={e => {
                  this.handleInputChange(e);
                }}
              />
            </div>
            <div class="form-group">
              <small class="form-text text-muted">Attitude</small>
              <textarea
                class="form-control"
                rows="2"
                name="attitude"
                value={this.state.attitude}
                onChange={e => {
                  this.handleInputChange(e);
                }}
              />
            </div>
            <div class="form-group">
              <small class="form-text text-muted">Comments</small>
              <textarea
                class="form-control"
                rows="1"
                name="comments"
                value={this.state.comments}
                onChange={e => {
                  this.handleInputChange(e);
                }}
              />
            </div>

            <div class="dropdown display-inline">
              <button
                class="btn btn-default dropdown-toggle btn-sm"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.state.status}
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  class="dropdown-item"
                  onClick={() => {
                    this.changeStatus(statusData.inprogress);
                  }}
                >
                  In progress
                </a>
                <a
                  class="dropdown-item"
                  onClick={e => {
                    this.changeStatus(statusData.rejected);
                  }}
                >
                  Rejected
                </a>
                <a
                  class="dropdown-item"
                  onClick={e => {
                    this.changeStatus(statusData.approved);
                  }}
                >
                  Approved
                </a>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-default btn-sm"
              onClick={e => {
                this.saveChanges();
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      )
    );
  }
}

export default PresentationEvaluationRound;
