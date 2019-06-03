import React, { Component } from "react";
import ReactDOM from "react-dom";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-fixedheader-dt/css/fixedHeader.dataTables.min.css";
import CommonService from "../../services/common";
import "bootstrap/dist/js/bootstrap.min.js";
import axios from "axios";

import keys from "../../config/keys";

var $ = require("jquery");
require("datatables.net");

class JobList extends Component {
    constructor() {
        super();
        this.state = {
            userData: {}
        };
        this.common = new CommonService();
    }


    componentDidMount() {
        if (this.common.isTokenExpired()) alert("Token expired");
        else {
            var self = this;

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
                                    <a>Job</a>
                                </li>
                            </ol>
                        </nav>
                        <h4>Job</h4>
                    </div>
                </div>
                <div className="row justify-content-md-center pt15">
                    <div className="col-md-11 pb15">
                        <div className="row">
                            <div className="col-md-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title">DotNet Developer</h5>
                                        <h6 class="card-subtitle mb-2 text-muted">created by Nidhi   Job Openings - 4</h6>
                                        <ul>
                                            <li class="card-text">Good knowledge on OOPS and Design Patterns and SQL.</li>
                                            <li class="card-text">Good knowledge on any programming language like C#, Java, Golang, etc.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JobList;
