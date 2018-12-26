import React, { Component } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css";
import CommonService from "../../services/common";
var $ = require("jquery");
require("datatables.net");

class Applicant extends Component {
  constructor(props) {
    super(props);
    this.common = new CommonService();
  }
  componentDidMount() {
    if (this.common.isTokenExpired()) alert("Token expired");
    else {
      $(this.refs.main).DataTable({
        ajax: {
          url: "http://localhost:5000/protected",
          type: "GET",
          headers: this.common.getTokenHeader(),
          dataSrc: function(json) {
            return json;
          },
          error: function(xhr, error) {
            if (xhr.status == 401) alert("Unauthorised user");
          }
        },
        fixedHeader: {
          header: true,
          footer: true
        },
        columns: [
          {
            data: "name",
            render: function(data, type, row, meta) {
              console.log(row);
              return `<span><a href="${window.location.origin}/new/process?id=${
                row._id
              }&rid=${row.recruiterId}">${data}</a></span>`;
            }
          },
          { data: "recruiter" },
          { data: "totalExperience" },
          { data: "organisation" },
          { data: "designation" },
          { data: "skillSet" },
          { data: "minNoticePeriod" }
        ],
        lengthMenu: [[15, 20, 25, 30, 100], [15, 20, 25, 30, 100]]
      });
    }
  }
  render() {
    if (!this.common.isAdmin()) {
      alert("you don't have permission to access this page");
      return null;
    } else {
      return (
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <p className="h4 text-left" style={{ paddingTop: "15px" }}>
              Applicant grid
            </p>
          </div>
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-default pull-right"
              onClick={() => {
                this.props.history.replace("/new/applicant");
              }}
            >
              Create New Applicant
            </button>
          </div>

          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <table
                  ref="main"
                  className="display custom-datatable"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Recruiter</th>
                      <th>Experience</th>
                      <th>Organisation</th>
                      <th>Designation</th>
                      <th>Skills</th>
                      <th>NoticePeriod</th>
                    </tr>
                  </thead>
                </table>{" "}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Applicant;
