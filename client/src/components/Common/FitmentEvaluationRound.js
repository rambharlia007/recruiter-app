import React, { Component } from "react";
import $ from "jquery";
import Axios from "axios";
import "bootstrap/dist/js/bootstrap.min.js";

class FitmentEvaluationRound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Fitment Evaluation Form</h5>
          <form>
            <div class="form-group">
            <small class="form-text text-muted">What impressed you most about the candidate?</small>
              <textarea class="form-control" rows="2" />
            </div>
            <div class="form-group">
            <small class="form-text text-muted">
            What according to you, can the candidate improve on?
            </small>
              <textarea class="form-control" rows="2" />
            </div>
            <div class="form-group">
            <small class="form-text text-muted">Would the candidate make a good fit at Prowareness?</small>
              <textarea class="form-control" rows="2" />
            </div>
            <div class="form-group">
            <small class="form-text text-muted">Motivation factors</small>
              <div class="form-check form-check-inline ">
                <input class="form-check-input" type="checkbox" />
                <small class="form-text text-muted">Challenging work/Projects</small>
              </div>
              <div class="form-check form-check-inline ">
                <input class="form-check-input" type="checkbox" />
                <small class="form-text text-muted">Designation/role</small>
              </div>
              <div class="form-check form-check-inline ">
                <input class="form-check-input" type="checkbox" />
                <small class="form-text text-muted">Financial aspect</small>
              </div>
              <textarea class="form-control" rows="2" placeholder="Comments" />
            </div>

            <div class="form-group">
            <small class="form-text text-muted">Passion</small>

              <div class="form-check form-check-inline ">
                <input class="form-check-input" type="checkbox" />
                <small class="form-text text-muted">Writing Blogs</small>
              </div>
              <div class="form-check form-check-inline ">
                <input class="form-check-input" type="checkbox" />
                <small class="form-text text-muted">Open source projects</small>
              </div>
              <div class="form-check form-check-inline ">
                <input class="form-check-input" type="checkbox" />
                <small class="form-text text-muted"> Association with any Groups / Conferences</small>
              </div>
              <div class="form-check form-check-inline ">
                <input class="form-check-input" type="checkbox" />
                <small class="form-text text-muted">Technical Certifications</small>
              </div>
              <textarea
                class="form-control"
                rows="2"
                placeholder="Commitment [*] (number of companies changed (descending order) and reasons)"
              />
            </div>
            <div class="dropdown">
              <button
                class="btn btn-default dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Status
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">
                  In progress
                </a>
                <a class="dropdown-item" href="#">
                  Rejected
                </a>
                <a class="dropdown-item" href="#">
                  Approved
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default FitmentEvaluationRound;
