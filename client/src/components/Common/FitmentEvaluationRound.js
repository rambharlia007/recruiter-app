import React, { Component } from "react";
import $ from "jquery";
import Axios from "axios";
import "bootstrap/dist/js/bootstrap.min.js";

const statusData = {
  inprogress : {color:"orange", value: "inprogress"},
  ready : {color:"yellow", value: "start"},
  onhold : {color:"lightgreen", value: "onhold"},
  rejected:{color:"red", value: "rejected"},
  approved:{color:"green", value: "approved"},
}

class FitmentEvaluationRound extends Component {
  constructor(props) {
    super(props);
    this.state = props.fitmentEvaluationRoundData;
  }

changeStatus(data){
    const currentState = this.state;
    currentState.status = data.value;
    currentState.statusColor = data.color;
    this.setState(currentState);
    this.props.fitmentCallback(currentState);
}

  render() {
    return (
      this.state.isVisible && (
        <div class="card">
          <div
            className={
              "card-body " + this.props.fitmentEvaluationRoundData.disableClass
            }
          >
            <h5 class="card-title">Fitment Evaluation Form</h5>
            <form>
              <div class="form-group">
                <small class="form-text text-muted">
                  What impressed you most about the candidate?
                </small>
                <textarea class="form-control" rows="2" />
              </div>
              <div class="form-group">
                <small class="form-text text-muted">
                  What according to you, can the candidate improve on?
                </small>
                <textarea class="form-control" rows="2" />
              </div>
              <div class="form-group">
                <small class="form-text text-muted">
                  Would the candidate make a good fit at Prowareness?
                </small>
                <textarea class="form-control" rows="2" />
              </div>
              <div class="form-group">
                <small class="form-text text-muted">Motivation factors</small>
                <div class="form-check form-check-inline ">
                  <input class="form-check-input" type="checkbox" />
                  <small class="form-text text-muted">
                    Challenging work/Projects
                  </small>
                </div>
                <div class="form-check form-check-inline ">
                  <input class="form-check-input" type="checkbox" />
                  <small class="form-text text-muted">Designation/role</small>
                </div>
                <div class="form-check form-check-inline ">
                  <input class="form-check-input" type="checkbox" />
                  <small class="form-text text-muted">Financial aspect</small>
                </div>
                <textarea
                  class="form-control"
                  rows="2"
                  placeholder="Comments"
                />
              </div>

              <div class="form-group">
                <small class="form-text text-muted">Passion</small>

                <div class="form-check form-check-inline ">
                  <input class="form-check-input" type="checkbox" />
                  <small class="form-text text-muted">Writing Blogs</small>
                </div>
                <div class="form-check form-check-inline ">
                  <input class="form-check-input" type="checkbox" />
                  <small class="form-text text-muted">
                    Open source projects
                  </small>
                </div>
                <div class="form-check form-check-inline ">
                  <input class="form-check-input" type="checkbox" />
                  <small class="form-text text-muted">
                    {" "}
                    Association with any Groups / Conferences
                  </small>
                </div>
                <div class="form-check form-check-inline ">
                  <input class="form-check-input" type="checkbox" />
                  <small class="form-text text-muted">
                    Technical Certifications
                  </small>
                </div>
                <textarea
                  class="form-control"
                  rows="2"
                  placeholder="Commitment [*] (number of companies changed (descending order) and reasons)"
                />
              </div>
              <div class="dropdown">
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
                  <a class="dropdown-item" onClick={()=>{
                    this.changeStatus(statusData.inprogress)
                  }}>
                    In progress
                  </a>
                  <a class="dropdown-item" onClick={(e)=>{
                    this.changeStatus(statusData.rejected)
                  }}>
                    Rejected
                  </a>
                  <a class="dropdown-item" onClick={(e)=>{
                    this.changeStatus(statusData.approved)
                  }}>
                    Approved
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      )
    );
  }
}

export default FitmentEvaluationRound;
