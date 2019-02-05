import React, { Component } from "react";
// import "datatables.net-dt/css/jquery.dataTables.min.css";
// import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css";
import CommonService from "../../services/common";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import "daterangepicker/daterangepicker.css";

import keys from "../../config/keys";

var $ = require("jquery");
require("datatables.net");
require("daterangepicker");

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
          url: "/protected",
          type: "GET",
          headers: this.common.getTokenHeader(),
          dataSrc: function (json) {
            return json;
          },
          error: function (xhr, error) {
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
            render: function (data, type, row, meta) {
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
          { data: "minNoticePeriod" },
          {
            width:"30%",
            data: "resume",
            render: function (data, type, row, meta) {
              return `<span><a style="text-overflow: ellipsis;" target="_blank" href="${keys.server}/public/${
                row.resume}">${data}</a></span>`;
            }
          },
        ],
        lengthMenu: [[15, 20, 25, 30, 100], [15, 20, 25, 30, 100]]
      });

      $(this.refs.reportrange).daterangepicker(
        {
          startDate: this.state.start,
          endDate: this.state.end,
          opens: 'left',
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

      this.cb(this.state.start, this.state.end);
    }
  }

  cb(start, end) {
    $("#reportrange1 span").html(
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
          <div className="row page-title p10">
            <div className="col-sm-8">
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item active">
                    <i class="fas fa-home"></i>
                    <a href="#">&nbsp; Home
                  </a> </li>
                  <li class="breadcrumb-item active"><a href="#">Applicant</a></li>
                </ol>
              </nav>

            </div>
            <div className="col-sm-4">
              <div
                id="reportrange1"
                ref="reportrange"
                className="calendar"
              >
                <i class="fa fa-calendar" />
                &nbsp;
                <span /> <i class="fa fa-caret-down" />
              </div>
            </div>
          </div>

          <div className="row justify-content-md-center pt15">
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
            <div className="col-md-12 p15">
              <div className="card">
                <div className="card-body">
                  <table
                    ref="main"
                    className="table table-hover perf table-condensed dataTable custom-datatable"
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
                        <th>resume</th>
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
