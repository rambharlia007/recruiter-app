import React, { Component } from "react";
import ReactDOM from "react-dom";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css";
import CommonService from "../../services/common";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";

import keys from "../../config/keys";

var $ = require("jquery");
require("datatables.net");

class Job extends Component {
  constructor() {
    super();
    this.state = {
      recruiters: [],
      createdBy: "",
      description: [],
      openings: 0,
      title: ""
    };
    this.common = new CommonService();
  }

  componentDidMount() {
    if (this.common.isTokenExpired()) alert("Token expired");
    else {
      var self = this;
      axios
        .get(`/recruiter`)
        .then(function(response) {
          console.log(response.data);
          self.setState({ recruiters: response.data });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
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
                  <a>Job</a>
                </li>
              </ol>
            </nav>
            <h4>Job</h4>
          </div>
        </div>
        <div className="row justify-content-md-center pt15">
          <div className="col-md-6 pb15">
            <div className="card">
              <div className="card-body">
                <form>
                  <div class="form-group">
                    <small id="emailHelp" class="form-text text-muted">
                      Job Title
                    </small>
                    <input
                      type="email"
                      class="form-control form-control-sm"
                      placeholder="Job Title"
                    />
                  </div>
                  <div class="form-group">
                    <small id="emailHelp" class="form-text text-muted">
                      Job created by
                    </small>
                    <select
                      class="form-control form-control-sm"
                      name="recruiterId"
                      value={this.state.recruiterId}
                      onChange={this.handleInputChange}
                    >
                      <option>select recruiter</option>
                      {this.state.recruiters.map((data, index) => {
                        return (
                          <option value={data._id}>{data.username}</option>
                        );
                      })}
                    </select>
                  </div>
                  <div class="form-group">
                    <small id="emailHelp" class="form-text text-muted">
                      Job openings
                    </small>
                    <select class="form-control" id="exampleFormControlSelect2">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <small class="form-text text-muted">Job Description</small>
                    <textarea
                      class="form-control form-control-sm"
                      placeholder="Job Description"
                    />
                  </div>
                  <button type="submit" class="btn btn-sm btn-default">
                    Submit
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

export default Job;
