import React, { Component } from "react";
import Header from "../../components/Header";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Fa,
  Card,
  CardBody,
  CardTitle
} from "mdbreact";

const pStyle = {
  padding: "0px"
};

class Interviewee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: "",
        dateOfBirth: null,
        nativePlace: null,
        location: null,
        qualification: null,
        university: null,
        year: null,
        score: null,
        totalExperience: null,
        relevantExperience: null,
        organisation: null,
        designation: null,
        skillSet: null,
        ctc: {
          actual: null,
          fixed: null,
          variable: null,
          expected: null,
          hike: null
        },
        otherOffers: null,
        noticePeriod: {
          min: null,
          max: null
        }
      }
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  submitApplicant = () => {
    console.log(this.state.formData);
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const formData = { ...this.state.formData };
    formData[name] = value;
    this.setState({
      formData
    });
  }

  render() {
    const { formData, ctc, noticePeriod } = this.state;
    return (
      <div>
        <Row className="justify-content-md-center">
          <div className="col-md-10">
            <p className="h4 text-left">Candidate Evaluation Form</p>
          </div>
          <Col md="10">
            <Card>
              <CardBody>
                <form>
                  <div className="row" style={{ paddingTop: "15px" }}>
                    <div className="col-md-3">
                      <p className="h6 text-center">Personal details</p>
                      <div className="row">
                        <div className="col-md-12">
                          <Input
                            type="text"
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <Input
                            type="text"
                            label="DOB"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <Input
                            type="text"
                            label="Native Place"
                            name="nativePlace"
                            value={formData.nativePlace}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <Input
                            type="textarea"
                            label="Current Location and Distance"
                            name="location"
                            value={formData.location}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-12 text-left">
                          <Button
                            className="btn-block"
                            onClick={this.submitApplicant}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <p className="h6 text-center">Education details</p>

                      <div className="row">
                        <div className="col-md-12">
                          <Input
                            type="text"
                            label="Highest Qualification"
                            name="qualification"
                            value={formData.qualification}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-12">
                          <Input
                            label="University"
                            name="university"
                            value={formData.university}
                            onChange={this.handleInputChange}
                          />
                        </div>

                        <div className="col-md-12">
                          <Input
                            label="Year"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>

                        <div className="col-md-12">
                          <Input
                            label="Score %"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <p className="h6 text-center">Professional details</p>
                      <div className="row">
                        <div className="col-md-6">
                          <Input
                            label="Total Experience"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <Input
                            label="Relevant Experient"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Input
                            label="Current Organisation"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <Input
                            label="Current Designation"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <Input
                            label="Skill Set"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3">
                          <Input
                            label="Current CTC"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <Input
                            label="Fixed"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <Input
                            label="Variable"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-3">
                          <Input
                            label="Expected salary"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-2">
                          <Input
                            label="Hike"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <Input
                            label="Any other offers in hand"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <Input
                            label="Notice period (Min)"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <Input
                            label="Notice period (Max)"
                            name="name"
                            value={formData.name}
                            onChange={this.handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Interviewee;
