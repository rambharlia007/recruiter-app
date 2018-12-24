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
      <div className="row justify-content-md-center">
        <div className="col-md-4">
          <div class="card">
            <div class="card-body">
              <form>
                <div class="form-group">
                  <label>Next round</label>
                  <select
                    class="form-control"
                    name="currentRoundType"
                    value={this.state.currentRoundType}
                    onChange={e => {
                      this.handleInputChange(e);
                    }}
                  >
                    <option value={roundType.tech1}>Technical round 1</option>
                    <option value={roundType.tech2}>Technical round 2</option>
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
          {this.state.currentRoundType == roundType.tech1 && <TechnicalRound />}
          {this.state.currentRoundType == roundType.tech2 && <TechnicalRound />}
        </div>
      </div>
    );
  }
}

export default Process;
