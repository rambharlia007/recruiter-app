import React, { Component } from "react";
import $ from "jquery";
import Axios from "axios";
import "bootstrap/dist/js/bootstrap.min.js";
import select2 from "select2";
import "../../../node_modules/select2/dist/css/select2.min.css";
import "../../../node_modules/font-awesome/css/font-awesome.css";

class TechnicalRound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skills: []
    };
  }

  componentDidMount() {
    $(this.refs.s2_skills).select2({
      multiple: "multiple",
      tags: true,
      tokenSeparators: [",", " "]
    });
    $('[data-toggle="tooltip"]').tooltip();
  }
  render() {
    return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Technical round-1</h5>
          <form>
            <div class="form-group">
              <label>Rating</label>
              <select class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div class="form-group">
              <label className="col-form-label col-form-label-sm">
                Skills &nbsp;
                <i
                  class="fas fa-info-circle"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Please type in the skill and hit enter"
                />
              </label>
              <div>
                <select
                  class="form-control form-control-sm"
                  ref="s2_skills"
                  multiple={true}
                  class="form-control"
                  value={this.state.skills}
                  onChange={this.handleInputChange}
                />
              </div>{" "}
            </div>
            <div class="form-group">
              <label>Comments</label>
              <textarea class="form-control" rows="3" />
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

export default TechnicalRound;
