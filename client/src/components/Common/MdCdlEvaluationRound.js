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

class MdCdlEvaluationRound extends Component {
  constructor(props) {
    super(props);
    this.state = props.data;
  }

  changeStatus(data, index) {
    const currentState = this.state;
    currentState.status = data.value;
    currentState.statusColor = data.color;
    this.setState(currentState);
    this.props.mdCdlEvaluationCallback(currentState, this.props.roundTypeId);
  }

  componentDidMount() { }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  saveChanges() {
    this.props.saveCallback(this.state, this.props.roundTypeId);
  }

  render() {
    return (
      this.props.data.isVisible && (
        <div class="card">
          <div className={"card-body " + this.props.data.disableClass}>
            <h5 class="card-title">{this.props.data.name}</h5>
            <div class="form-group">
              <small class="form-text text-muted">Comments</small>
              <textarea class="form-control" rows="1"
                name="comments"
                value={this.state.comments}
                onChange={e => {
                  this.handleInputChange(e);
                }} />
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

export default MdCdlEvaluationRound;
