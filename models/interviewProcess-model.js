const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const interviewProcessSchema = new Schema({
  fitmentEvaluationRound: {
    suggestion1: {
      type: "String"
    },
    suggestion2: {
      type: "String"
    },
    suggestion3: {
      type: "String"
    },
    isChallengingWorkOrProjects: {
      type: "Boolean"
    },
    isDesignationOrRole: {
      type: "Boolean"
    },
    isFinancialAspects: {
      type: "Boolean"
    },
    motivationalFactorComments: {
      type: "String"
    },
    isWritingBlogs: {
      type: "Boolean"
    },
    isOpenSourceProjects: {
      type: "Boolean"
    },
    isAnyConference: {
      type: "Boolean"
    },
    isTechnicalCertifications: {
      type: "Boolean"
    },
    passionComments: {
      type: "String"
    },
    name: {
      type: "String"
    },
    assignedTo: {
      type: "String"
    },
    rating: {
      type: "Number"
    },
    status: {
      type: "String"
    },
    assignedId: {
      type: "String"
    },
    statusColor: {
      type: "String"
    }
  },
  presentationEvaluationRound: {
    comments: {
      type: "String"
    },
    contentOrCode: {
      type: "String"
    },
    communication: {
      type: "String"
    },
    energy: {
      type: "String"
    },
    attitude: {
      type: "String"
    },
    skills: {
      type: ["Mixed"]
    },
    name: {
      type: "String"
    },
    assignedTo: {
      type: "String"
    },
    rating: {
      type: "Number"
    },
    status: {
      type: "String"
    },
    assignedId: {
      type: "String"
    },
    statusColor: {
      type: "String"
    }
  },
  cdlRound: {
    name: {
      type: "String"
    },
    assignedTo: {
      type: "String"
    },
    status: {
      type: "String"
    },
    assignedId: {
      type: "String"
    },
    statusColor: {
      type: "String"
    },
    comments: {
      type: "String"
    }
  },
  mdRound: {
    name: {
      type: "String"
    },
    assignedTo: {
      type: "String"
    },
    status: {
      type: "String"
    },
    assignedId: {
      type: "String"
    },
    statusColor: {
      type: "String"
    },
    comments: {
      type: "String"
    }
  },
  technicalRound: {
    type: [
      {
        rating: {
          type: "Number"
        },
        skills: {
          type: "Array"
        },
        comments: {
          type: "String"
        },
        assignedTo: {
          type: "String"
        },
        name: {
          type: "String"
        },
        commentValue: {
          type: "String"
        },
        assignedId: {
          type: "String"
        },
        currentUserId: {
          type: "String"
        },
        status: {
          type: "String"
        },
        statusColor: {
          type: "String"
        }
      }
    ]
  },
  codeEvaluationRound: {
    comments: {
      type: "String"
    },
    technologies: {
      type: ["Mixed"]
    },
    name: {
      type: "String"
    },
    assignedTo: {
      type: "String"
    },
    rating: {
      type: "Number"
    },
    status: {
      type: "String"
    },
    assignedId: {
      type: "String"
    },
    statusColor: {
      type: "String"
    }
  },
  recruiterId: {
    type: "String"
  },
  intervieweeId: {
    type: "String"
  },
  createdAt: {
    type: String,
    default: moment().format("YYYY-MM-DD")
  }
});

const InterviewProcess = mongoose.model(
  "interviewProcess",
  interviewProcessSchema
);

module.exports = InterviewProcess;
