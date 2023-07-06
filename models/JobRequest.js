import mongoose from "mongoose";

const JobRequestSchema = new mongoose.Schema(
  {
    jobCompanyName: {
      type: String,
      maxlength: 100,
    },
    jobRequestNo: {
      type: String,
      maxlength: 100,
    },
    jobRequestDate: {
      type: Date,
      maxlength: 100,
    },

    requestBy: {
      type: String,
      maxlength: 100,
    },
    department: {
      type: String,
      maxlength: 100,
    },
    costCenter: {
      type: String,
      maxlength: 100,
    },

    exampleProduct: {
      type: String,
      maxlength: 20,
    },

    documentCOA: {
      type: String,
      maxlength: 20,
    },

    documentRD: {
      type: String,
      maxlength: 20,
    },

    documentother: {
      type: String,
      maxlength: 200,
    },

    dueDate: {
      type: Date,
      maxlength: 100,
    },

    acceptBy: {
      type: String,
      maxlength: 200,
    },

    acceptDate: {
      type: Date,
      maxlength: 100,
    },

    acceptDescription: {
      type: String,
      maxlength: 200,
    },

    approveBy: {
      type: String,
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["success", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    details: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("JobRequest", JobRequestSchema);
