import React, { Component } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css";
var $ = require("jquery");
require("datatables.net");
require("datatables.net-fixedheader-dt");

class datatabletest extends Component {
  componentDidMount() {
    $(this.refs.main).DataTable({
      ajax: {
        url: "http://localhost:3500/applicant",
        dataSrc: function(json) {
          return json;
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
            return `<span><a href="${
              window.location.origin
            }/new/process/${data}">${data}</a></span>`;
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
  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="col-md-5">
          <p className="h4 text-left" style={{ paddingTop: "15px" }}>
            Applicant grid
          </p>
        </div>
        <div className="col-md-5">
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

        <div className="col-md-10">
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

export default datatabletest;
