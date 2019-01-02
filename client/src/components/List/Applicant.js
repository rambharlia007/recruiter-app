import React, { Component } from "react";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css";
import CommonService from "../../services/common";
import { Bar } from 'react-chartjs-2';
var $ = require("jquery");
require("datatables.net");


const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Sales',
    type: 'bar',
    data: [51, 65, 40, 49, 60, 37, 40],
    fill: false,
    borderColor: '#EC932F',
    backgroundColor: '#EC932F',
    pointBorderColor: '#EC932F',
    pointBackgroundColor: '#EC932F',
    pointHoverBackgroundColor: '#EC932F',
    pointHoverBorderColor: '#EC932F',
    yAxisID: 'y-axis-2'
  }, {
    type: 'bar',
    label: 'Visitor',
    data: [200, 185, 590, 621, 250, 400, 95],
    fill: false,
    backgroundColor: '#71B37C',
    borderColor: '#71B37C',
    hoverBackgroundColor: '#71B37C',
    hoverBorderColor: '#71B37C',
    yAxisID: 'y-axis-1'
  }]
};

const options = {
  responsive: true,
  tooltips: {
    mode: 'label'
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
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
        gridLines: {
          display: false
        }
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
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
  }
  componentDidMount() {
    if (this.common.isTokenExpired()) alert("Token expired");
    else {
      $(this.refs.main).DataTable({
        ajax: {
          url: "http://localhost:5000/protected",
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
          <div className="col-md-4 pb10">
            <div className="card">
              <div className="card-body">
                <Bar
                  data={data}
                  options={options}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4 pb10">
            <div className="card">
              <div className="card-body">
                <Bar
                  data={data}
                  options={options}
                />
              </div>
            </div>
          </div>
          <div className="col-md-4 pb10">
            <div className="card">
              <div className="card-body">
                <Bar
                  data={data}
                  options={options}
                />
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
      );
    }
  }
}

export default Applicant;
