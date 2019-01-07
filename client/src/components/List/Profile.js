import React, { Component } from "react";
import ReactDOM from "react-dom";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css";
import CommonService from "../../services/common";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";
var $ = require("jquery");
require("datatables.net");

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userData: {}
    };
    this.table;
    this.common = new CommonService();
  }

  getUserById = id => {
    var self = this;
    axios
      .get(`http://localhost:5000/user/${id}`, {
        headers: this.common.getTokenHeader()
      })
      .then(function(response) {
        self.setState({ userData: response.data });
        $("#profile_modal").modal("show");
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  setModalComponent = () => {
    var self = this;
    $(".user-edit").click(function() {
      var id = $(this).attr("data-id");
      self.getUserById(id);
    });
  };

  initCallback = (settings, json) => {
    this.setModalComponent();
  };

  componentDidMount() {
    if (this.common.isTokenExpired()) alert("Token expired");
    else {
      var self = this;
      this.table = $(this.refs.profile_grid).DataTable({
        ajax: {
          url: "http://localhost:5000/user",
          type: "GET",
          headers: this.common.getTokenHeader(),
          dataSrc: function(json) {
            return json;
          },
          error: function(xhr, error) {
            if (xhr.status == 501) alert("Unauthorised user");
          }
        },
        fixedHeader: {
          header: true,
          footer: true
        },
        initComplete: self.initCallback,
        columns: [
          {
            data: "imageUrl",
            render: function(data, type, row, meta) {
              return `<span>
                  <img src="${data}" class="img-thumbnail" style="height:50px" alt="not available">
                  </span>`;
            }
          },
          { data: "username" },
          { data: "emailId" },
          //  { data: "phoneNumber" },
          { data: "role" },
          {
            render: function(data, type, row, meta) {
              return `<span class="user-edit" data-id=${
                row._id
              }><i class="fas fa-user-edit" ></i></span>`;
            }
          }
        ],
        lengthMenu: [[15, 20, 25, 30, 100], [15, 20, 25, 30, 100]]
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    const formData = { ...this.state.userData };
    formData[name] = value;
    this.setState({
      userData: formData
    });
  }

  changeRole = () => {
    var self = this;
    axios
      .patch(
        `http://localhost:5000/user/${this.state.userData._id}`,
        this.state.userData,
        {
          headers: this.common.getTokenHeader()
        }
      )
      .then(response => {
        if (response.status == 200) {
          $("#profile_modal").modal("hide");
          self.table.ajax.reload(self.initCallback);
        }
      });
  };

  render() {
    return (
      <div>
        <div className="row page-title p10">
          <div className="col-sm-8">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item active">
                  <i class="fas fa-home" />
                  <a>&nbsp; Home</a>{" "}
                </li>
                <li class="breadcrumb-item active">
                  <a>Profile</a>
                </li>
              </ol>
            </nav>
            <h4>Profile</h4>
          </div>
        </div>
        <div className="row justify-content-md-center pt15">
          <div className="col-md-11">
            <div className="card">
              <div className="card-body">
                <table
                  ref="profile_grid"
                  className="display custom-datatable"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th />
                      <th>Name</th>
                      <th>Email</th>
                      {/* <th>Phone number</th> */}
                      <th>Role</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div class="modal" id="profile_modal">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit user</h4>
                <button type="button" class="close" data-dismiss="modal">
                  &times;
                </button>
              </div>

              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <input
                      class="form-control"
                      value={this.state.userData.username}
                      readonly="readonly"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      value={this.state.userData.emailId}
                      readonly="readonly"
                    />
                  </div>
                  <select
                    class="form-control form-control-sm"
                    name="role"
                    value={this.state.userData.role}
                    onChange={e => {
                      this.handleInputChange(e);
                    }}
                  >
                    <option value="super_admin">super_admin</option>
                    <option value="admin">admin</option>
                    <option value="public">public</option>
                    <option value="internal_user">internal_user</option>
                  </select>
                </form>
              </div>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => {
                    this.changeRole();
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
