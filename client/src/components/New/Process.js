import React, { Component } from "react";
import Header from "../../components/Header";
import $ from "jquery";
import Axios from "axios";
import "bootstrap/dist/js/bootstrap.min.js";
import FitmentEvaluationRound from "../Common/FitmentEvaluationRound";
import TechnicalRound from "../Common/TechnicalRound";

const roundType = {
  fitmentEvaluationRound: 1,

  tech1: 2,
  tech2: 3,
  codeEvaluationRound: 4,
  cdlRound: 5,
  mdRound: 6
};

class Process extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoundAssignedTo: "",
      nextRoundAssignedTo: "",
      smsContent: "",
      currentRoundType: roundType.fitmentEvaluationRound
    };
  }

  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-4">
          <div class="card">
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label>Next round</label>
                  <select class="form-control">
                    <option>Technical round 1</option>
                    <option>Technical round 2</option>
                    <option>Code evaluation</option>
                    <option>Presentation round</option>
                    <option>CDL Evaluation</option>
                    <option>Managing Director Evaluation</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Assign to</label>
                  <select class="form-control">
                    <option>I-1</option>
                    <option>I-2</option>
                    <option>I-3</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Message</label>
                  <textarea class="form-control" rows="3" />
                </div>
                <button type="button" className="btn btn-default pull-right">
                  Send Email
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          {this.state.currentRoundType == roundType.fitmentEvaluationRound && (
            <FitmentEvaluationRound />
          )}
        </div>
      </div>
    );
  }
}

export default Process;
