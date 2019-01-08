// import React, { Component } from "react";
// import $ from "jquery";
// import Axios from "axios";
// import "bootstrap/dist/js/bootstrap.min.js";
// import "../../../node_modules/font-awesome/css/font-awesome.css";

// const statusData = {
//   inprogress: { color: "orange", value: "inprogress" },
//   ready: { color: "yellow", value: "ready" },
//   onhold: { color: "lightgreen", value: "onhold" },
//   rejected: { color: "red", value: "rejected" },
//   approved: { color: "green", value: "approved" }
// };

// class PresentationEvaluationRound extends Component {
//   constructor(props) {
//     super(props);
//     this.state = props.data;
//   }

//   changeStatus(data, index) {
//     this.props.PresentationEvaluationCallback();
//   }

//   componentDidMount() {}

//   handleInputChange(event) {
//     const target = event.target;
//     const value = target.type === "checkbox" ? target.checked : target.value;
//     const name = target.name;
//     this.setState({
//       [name]: value
//     });
//   }

//   handleInputChange(event, index) {}

//   addNewSkills() {
//     const skills = this.state.skills;
//     skills.push({ name: "", rating: "" });
//     this.setState({ skills: skills });
//   }

//   render() {
//     return (
//       this.props.data.isVisible && (
//         <div class="card">
//           <div class="card-body">
//             <h5 class="card-title">Presentation Evaluation Round</h5>
//             {this.state.technologies.map((data, index) => {
//               return (
//                 <div class="form-row">
//                   <div class="form-group col-md-6">
//                     <small class="form-text text-muted">Technology</small>
//                     <input type="text" class="form-control form-control-sm" />
//                   </div>
//                   <div class="form-group col-md-4">
//                     <small class="form-text text-muted">Rating</small>
//                     <select class="form-control form-control-sm">
//                       <option selected>1</option>
//                       <option>2</option>
//                       <option>3</option>
//                       <option>4</option>
//                     </select>
//                   </div>
//                 </div>
//               );
//             })}
//             <div className="row col-md-4 btn-add-tech">
//               <button
//                 type="button"
//                 className="btn btn-default btn-sm"
//                 onClick={() => {
//                   this.addNewSkills();
//                 }}
//               >
//                 Add Skills
//               </button>
//             </div>
//             <div class="form-group">
//               <small class="form-text text-muted">Content/Code</small>
//               <textarea class="form-control" rows="2" />
//             </div>
//             <div class="form-group">
//               <small class="form-text text-muted">Communication</small>
//               <textarea class="form-control" rows="2" />
//             </div>
//             <div class="form-group">
//               <small class="form-text text-muted">Energy</small>
//               <textarea class="form-control" rows="2" />
//             </div>
//             <div class="form-group">
//               <small class="form-text text-muted">Attitude</small>
//               <textarea class="form-control" rows="2" />
//             </div>
//             <div class="form-group">
//               <small class="form-text text-muted">Comments</small>
//               <textarea class="form-control" rows="1" />
//             </div>
//           </div>
//         </div>
//       )
//     );
//   }
// }

// export default PresentationEvaluationRound;
