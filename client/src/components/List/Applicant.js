import React, { Component } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css";
import CommonService from "../../services/common";
import { Bar } from "react-chartjs-2";
import moment from "moment";
var $ = require("jquery");
require("datatables.net");

const data = {
  labels: ["Nidhin", "Ram", "Vashist", "Puneeth", "Kamban", "Vibha", "R-1"],
  datasets: [
    {
      type: "bar",
      label: "Application Processed",
      data: [200, 185, 590, 621, 250, 400, 95],
      fill: false,
      backgroundColor: "#71B37C",
      borderColor: "#71B37C",
      hoverBackgroundColor: "#71B37C",
      hoverBorderColor: "#71B37C",
      yAxisID: "y-axis-1"
    }
  ]
};

const data1 = {
  labels: [
    "Thiruekamban",
    "Ram",
    "Puneeth",
    "Jagmeet Singh",
    "Vashist",
    "Abhinav",
    "Guest"
  ],
  datasets: [
    {
      type: "bar",
      label: "Interviewer Count",
      data: [100, 150, 75, 1, 250, 125, 10],
      fill: false,
      backgroundColor: "#71B37C",
      borderColor: "#71B37C",
      hoverBackgroundColor: "#71B37C",
      hoverBorderColor: "#71B37C",
      yAxisID: "y-axis-1"
    }
  ]
};

const data2 = {
  labels: ["Approved", "Rejected", "OnHold"],
  datasets: [
    {
      type: "bar",
      label: "Approved/Rejected count",
      data: [150, 250, 50],
      fill: false,
      backgroundColor: "#71B37C",
      borderColor: "#71B37C",
      hoverBackgroundColor: "#71B37C",
      hoverBorderColor: "#71B37C",
      yAxisID: "y-axis-1"
    }
  ]
};

const options = {
  responsive: true,
  tooltips: {
    mode: "label"
  },
  elements: {
    line: {
      fill: false
    }
  },
  scales: {
    xAxes: [
      {
        display: true,
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-1",
        gridLines: {
          display: false
        }
      }
    ]
  }
};

class Applicant extends Component {
  constructor(props) {
    super(props);
    this.common = new CommonService();
    this.state = {
      start: moment().subtract(29, "days"),
      end: moment()
    };
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

      $(this.refs.reportrange).daterangepicker(
        {
          startDate: start,
          endDate: end,
          ranges: {
            Today: [moment(), moment()],
            Yesterday: [
              moment().subtract(1, "days"),
              moment().subtract(1, "days")
            ],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
            "Last Month": [
              moment()
                .subtract(1, "month")
                .startOf("month"),
              moment()
                .subtract(1, "month")
                .endOf("month")
            ]
          }
        },
        this.cb
      );

      this.cb(start, end);
    }
  }

  cb(start, end) {
    $("#reportrange span").html(
      start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
    );
  }

  render() {
    if (!this.common.isAdmin()) {
      alert("you don't have permission to access this page");
      return null;
    } else {
      return (
        <React.Fragment>
          <div className="row page-title">
            <div className="col-md-6">
              <h3>Applicant</h3>
            </div>
            <div className="col-md-6">
              <div
                ref="reportrange"
                style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%"
              >
                <i class="fa fa-calendar" />
                &nbsp;
                <span /> <i class="fa fa-caret-down" />
              </div>
            </div>
          </div>

          <div className="row justify-content-md-center">
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-default btn-sm pull-right"
                onClick={() => {
                  this.props.history.replace("/new/applicant");
                }}
              >
                Create New Applicant
              </button>
            </div>
            <div className="col-md-4 pb10">
              <div className="card">
                <div className="card-body">
                  <Bar data={data} options={options} />
                </div>
              </div>
            </div>
            <div className="col-md-4 pb10">
              <div className="card">
                <div className="card-body">
                  <Bar data={data1} options={options} />
                </div>
              </div>
            </div>
            <div className="col-md-4 pb10">
              <div className="card">
                <div className="card-body">
                  <Bar data={data2} options={options} />
                </div>
              </div>
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
        </React.Fragment>
      );
    }
  }
}

export default Applicant;
