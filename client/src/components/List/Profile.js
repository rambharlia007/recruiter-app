import React, { Component } from "react";
import ReactDOM from 'react-dom';
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
        }
        this.common = new CommonService();
    }

getUserById = (id) =>{

    var self = this;
    axios
      .get(`http://localhost:5000/user/${id}`, {headers: this.common.getTokenHeader()})
      .then(function(response) {
        self.setState({userData: response.data});
        $("#profile_modal").modal("show");
      })
      .catch(function(error) {
        console.log(error);
      });
}

    componentDidMount() {
        if (this.common.isTokenExpired()) alert("Token expired");
        else {
            var self = this;
            $(this.refs.profile_grid).DataTable({
                ajax: {
                    url: "http://localhost:5000/user",
                    type: "GET",
                    headers: this.common.getTokenHeader(),
                    dataSrc: function (json) {
                        return json;
                    },
                    error: function (xhr, error) {
                        if (xhr.status == 501) alert("Unauthorised user");
                    }
                },
                fixedHeader: {
                    header: true,
                    footer: true
                },
                initComplete: function (settings, json) {
                    $(".user-edit").click(function () {
                        var id = $(this).attr("data-id");
                        self.getUserById(id);
                    })

                },
                columns: [
                    {
                        data: "imageUrl",
                        render: function (data, type, row, meta) {
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
                        render: function (data, type, row, meta) {
                            return `<span class="user-edit" data-id=${row._id}><i class="fas fa-user-edit" ></i></span>`;
                        }
                    }
                ],
                lengthMenu: [[15, 20, 25, 30, 100], [15, 20, 25, 30, 100]]
            });

        }
    }

    changeRole = () => {

    }

    render() {
        return (<div>
            <div className="row justify-content-md-center">
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
                                        <th></th>
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
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div class="modal-body">
                           <pre>{JSON.stringify(this.state.userData)}</pre>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" onClick={this.working}>Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
        );
    }
}


export default Profile