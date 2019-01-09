const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewProcessSchema = new Schema({
  currentRoundAssignedTo: {
    type: "String"
  },
  nextRoundAssignedTo: {
    type: "String"
  },
  smsContent: {
    type: "String"
  },
  currentRoundType: {
    type: "Date"
  },
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
    isEditable: {
      type: "Boolean"
    },
    isVisible: {
      type: "Boolean"
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
    bgColor: {
      type: "String"
    },
    status: {
      type: "String"
    },
    statusColor: {
      type: "String"
    },
    assignedId: {
      type: "ObjectId"
    },
    disableClass: {
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
    isEditable: {
      type: "Boolean"
    },
    isVisible: {
      type: "Boolean"
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
    bgColor: {
      type: "String"
    },
    status: {
      type: "String"
    },
    statusColor: {
      type: "String"
    },
    disableClass: {
      type: "String"
    },
    assignedId: {
      type: "ObjectId"
    }
  },
  cdlRound: {
    type: "Array"
  },
  mdRound: {
    type: "Array"
  },
  technicalRound: {
    type: ["Mixed"]
  },
  interviewers: {
    type: ["Mixed"]
  },
  codeEvaluationRound: {
    comments: {
      type: "String"
    },
    technologies: {
      type: ["Mixed"]
    },
    isEditable: {
      type: "Boolean"
    },
    isVisible: {
      type: "Boolean"
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
    bgColor: {
      type: "String"
    },
    status: {
      type: "String"
    },
    statusColor: {
      type: "String"
    },
    disableClass: {
      type: "String"
    },
    assignedId: {
      type: "ObjectId"
    }
  },
  currentUserId: {
    type: "ObjectId"
  },
  assignedId: {
    type: "ObjectId"
  },
  canAddNewRounds: {
    type: "Boolean"
  }
});

const InterviewProcess = mongoose.model(
  "interviewProcess",
  interviewProcessSchema
);

module.exports = InterviewProcess;
