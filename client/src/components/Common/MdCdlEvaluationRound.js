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
    this.props.mdCdlEvaluationCallback();
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

  handleInputChange(event, index) {}

  render() {
    return (
      this.props.data.isVisible && (
        <div class="card">
          <div className={"card-body " + this.props.data.disableClass}>
            <h5 class="card-title">{this.props.data.name}</h5>
            <div class="form-group">
              <small class="form-text text-muted">Comments</small>
              <textarea class="form-control" rows="1" />
            </div>
          </div>
        </div>
      )
    );
  }
}

export default MdCdlEvaluationRound;
