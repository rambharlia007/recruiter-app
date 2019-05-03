import React, { Component } from "react";
import $ from "jquery";
import Axios from "axios";
import "bootstrap/dist/js/bootstrap.min.js";
import select2 from "select2";
import "../../../node_modules/select2/dist/css/select2.min.css";
import "../../../node_modules/font-awesome/css/font-awesome.css";

const formData = {
  rating: 0,
  skills: [],
  comments: "",
  assignedTo: "",
  isEditable: "",
  isVisible: false,
  name: "",
  commentValue: ""
};

const statusData = {
  inprogress: { color: "orange", value: "inprogress" },
  ready: { color: "yellow", value: "ready" },
  onhold: { color: "lightgreen", value: "onhold" },
  rejected: { color: "red", value: "rejected" },
  approved: { color: "green", value: "approved" }
};

class TechnicalRound extends Component {
  constructor(props) {
    super(props);
    const inputData = props.technicalData;
    this.state = {
      rounds: inputData,
      currentUserId: props.currentUserId
    };
  }

  changeStatus(data, index) {
    const rnds = this.state.rounds;
    rnds[index]["status"] = data.value;
    rnds[index]["statusColor"] = data.color;
    this.setState({
      rounds: rnds
    });
    this.props.techCallback(rnds);
  }

  componentDidMount() {
    $(this.refs.s2_skills).select2({
      multiple: "multiple",
      tags: true,
      tokenSeparators: [",", " "]
    });
    $('[data-toggle="tooltip"]').tooltip();
  }

  handleInputChange(event, index) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const rnds = this.state.rounds;
    rnds[index][name] = value;
    this.setState({
      rounds: rnds
    });

    if (name == "rating") {
      this.props.techCallback(rnds);
    }
  }

  _handleKeyPress(e, index) {
    if (e.key === "Enter") {
      e.preventDefault();
      const name = e.target.name;
      var rnds = this.state.rounds;
      var parseData = JSON.stringify(rnds[index]);
      var currentRound = JSON.parse(parseData);
      var value = currentRound[name];
      var skills = currentRound["skills"];
      skills.push(value);
      currentRound.skills = skills;
      rnds[index] = currentRound;
      currentRound[name] = "";
      this.setState({ rounds: rnds });
    }
  }

  saveChanges() {
    this.props.saveCallback(this.state, 2);
  }

  render() {
    return (
      <div>
        {this.state.rounds.map(
          (row, index) =>
            row.isVisible && (
              <div className="card" key={index}>
                <div className={"card-body " + row.disableClass}>
                  <h5 className="card-title">{row.name}</h5>
                  <div>
                    <div class="form-group">
                      <small className="form-text text-muted">Rating</small>
                      <select
                        class="form-control"
                        name="rating"
                        value={row.rating}
                        onChange={e => {
                          this.handleInputChange(e, index);
                        }}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <small class="form-text text-muted">Skills</small>
                    <div className="custom-div">
                      <input
                        type="text"
                        placeholder="add skills and hit enter"
                        class="form-control form-control-sm col-md-5 mb5"
                        name="skillValue"
                        value={row.skillValue}
                        onKeyPress={e => {
                          this._handleKeyPress(e, index);
                        }}
                        onChange={e => {
                          this.handleInputChange(e, index);
                        }}
                      />
                      {row.skills.map(dv => {
                        return (
                          <span class="badge badge-secondary1 mr5">{dv}</span>
                        );
                      })}
                    </div>
                    <div class="form-group">
                      <small class="form-text text-muted">Comments</small>
                      <textarea
                        class="form-control"
                        rows="1"
                        name="comments"
                        value={row.comments}
                        onChange={e => {
                          this.handleInputChange(e, index);
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
                        {row.status}
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a
                          class="dropdown-item"
                          onClick={() => {
                            this.changeStatus(statusData.inprogress, index);
                          }}
                        >
                          In progress
                        </a>
                        <a
                          class="dropdown-item"
                          onClick={e => {
                            this.changeStatus(statusData.rejected, index);
                          }}
                        >
                          Rejected
                        </a>
                        <a
                          class="dropdown-item"
                          onClick={e => {
                            this.changeStatus(statusData.approved, index);
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
              </div>
            )
        )}
      </div>
    );
  }
}

export default TechnicalRound;
