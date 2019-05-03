import React, { Component } from "react";
import CommonService from "../../services/common";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import axios from "axios";
import "daterangepicker/daterangepicker.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import keys from "../../config/keys";

var $ = require("jquery");
require("datatables.net");
require("daterangepicker");

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
        },
        ticks: {
          autoSkip: false
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
        },
        ticks: {
          beginAtZero: true,
          min: 0
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
      end: moment(),
      applicationByRecruiterData: {},
      applicationByInterviewerData: {},
      applicationByStatusData: {}
    };
    this.tableRef = null;
  }

  getGraphBaseData(data, labels, name) {
    return {
      labels: labels,
      datasets: [
        {
          type: "bar",
          label: name,
          data: data,
          fill: false,
          backgroundColor: "#71B37C",
          borderColor: "#71B37C",
          hoverBackgroundColor: "#71B37C",
          hoverBorderColor: "#71B37C",
          yAxisID: "y-axis-1"
        }
      ]
    };
  }

  getEndPoint(endPoint) {
    const startDate = this.state.start.format("YYYY-MM-DD");
    const endDate = this.state.end.format("YYYY-MM-DD");
    return `/${endPoint}/${startDate}/${endDate}`;
  }

  applicationCountByRecruiter() {
    var self = this;
    var labels = [];
    var data = [];
    axios
      .get(this.getEndPoint("applicationByRecruiter"))
      .then(function(response) {
        response.data.forEach(element => {
          labels.push(element._id);
          data.push(element.count);
        });
        const graphData = self.getGraphBaseData(
          data,
          labels,
          "Application processed by recruiter"
        );
        self.setState({ applicationByRecruiterData: graphData });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  applicationCountByInterviewer() {
    var self = this;
    var labels = [];
    var data = [];
    axios
      .get(this.getEndPoint("applicationByInterviewer"))
      .then(function(response) {
        var responseData = response.data;
        for (var element in responseData) {
          if (element !== "null") {
            labels.push(element);
            data.push(responseData[element]);
          }
        }
        const graphData = self.getGraphBaseData(
          data,
          labels,
          "Application processed by interviewer"
        );
        self.setState({ applicationByInterviewerData: graphData });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  applicationCountByStatus() {
    var self = this;
    var labels = [];
    var data = [];
    axios
      .get(this.getEndPoint("applicationByStatus"))
      .then(function(response) {
        response.data.forEach(element => {
          labels.push(element._id);
          data.push(element.count);
        });
        const graphData = self.getGraphBaseData(
          data,
          labels,
          "Application Status"
        );
        self.setState({ applicationByStatusData: graphData });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  setDateRangePicker() {
    $(this.refs.reportrange).daterangepicker(
      {
        startDate: this.state.start,
        endDate: this.state.end,
        opens: "left",
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
      this.cb.bind(this)
    );
    this.cb(this.state.start, this.state.end);
  }

  getTableData() {
    this.tableRef = $(this.refs.main).DataTable({
      ajax: {
        url: this.getEndPoint("protected"),
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
          data: "status",
          render: function(data, type, row, meta) {
            var val = "orange";
            if (data === "approved") val = "green";
            else if (data === "rejected") val = "red";
            else if (data === "onhold") val = "lightgreen";
            return `<span class="dot ${val}" data-toggle="tooltip" data-placement="top" title="${data}"></span>`;
          }
        },
        {
          data: "name",
          render: function(data, type, row, meta) {
            return `<span><a style="text-decoration: underline;" href="${
              window.location.origin
            }/new/process?id=${row._id}&rid=${
              row.recruiterId
            }">${data}</a></span>`;
          }
        },
        { data: "emailId" },
        { data: "phoneNumber" },
        { data: "recruiter" },
        { data: "totalExperience" },
        { data: "organisation" },
        { data: "designation" },
        { data: "minNoticePeriod" },
        // {
        //   // width: "30%",
        //   data: "resume",
        //   render: function(data, type, row, meta) {
        //     return `<span><a style="text-overflow: ellipsis;" target="_blank" href="${
        //       keys.server
        //     }/public/${row.resume}">${data}</a></span>`;
        //   }
        // }
        { data: "createdAt" }
      ],
      lengthMenu: [[15, 20, 25, 30, 100], [15, 20, 25, 30, 100]],
      initComplete: function(settings, json) {
        $('[data-toggle="tooltip"]').tooltip();
      }
    });
  }

  componentDidMount() {
    if (this.common.isTokenExpired()) alert("Token expired");
    else {
      this.setDateRangePicker();
      this.getTableData();
      this.applicationCountByRecruiter();
      this.applicationCountByInterviewer();
      this.applicationCountByStatus();
    }
  }

  cb(start, end) {
    this.setState({ start: start });
    this.setState({ end: end });
    $("#reportrange1 span").html(
      start.format("MMMM D, YYYY") + " - " + end.format("MMMM D, YYYY")
    );
    if (this.tableRef) {
      this.tableRef.ajax.url(this.getEndPoint("protected")).load(function() {
        $('[data-toggle="tooltip"]').tooltip();
      });
    }
    this.applicationCountByRecruiter();
    this.applicationCountByInterviewer();
    this.applicationCountByStatus();
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
                    <i class="fas fa-home" />
                    <a href="#">&nbsp; Home</a>{" "}
                  </li>
                  <li class="breadcrumb-item active">
                    <a href="#">Applicant</a>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-sm-4">
              <div id="reportrange1" ref="reportrange" className="calendar">
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
                  <Bar
                    data={this.state.applicationByRecruiterData}
                    options={options}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4 pb10">
              <div className="card">
                <div className="card-body">
                  <Bar
                    data={this.state.applicationByInterviewerData}
                    options={options}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4 pb10">
              <div className="card">
                <div className="card-body">
                  <Bar
                    data={this.state.applicationByStatusData}
                    options={options}
                  />
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
                        <th>Status</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Recruiter</th>
                        <th>Experience</th>
                        <th>Organisation</th>
                        <th>Designation</th>
                        <th>NoticePeriod</th>
                        <th>Date</th>
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
