import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: Number,
      required: false,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    admissionDate: {
      type: Date,
      required: true,
    },
    membershipType: {
      type: String,
      required: true,
    },
    membershipExpiry: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    bmi: {
      type: Number,
      required: true,
    },
    lastEntry: {
      type: Date,
      required: true,
    },
    lastExit: {
      type: Date,
      required: true,
    },
    totalDaysPresent: {
      type: Number,
      required: true,
    },
    alertSentForRenewal: {
      type: Boolean,
      required: true,
    },
    alertSentForAbsence: {
      type: Boolean,
      required: true,
    },
    medicalConditions: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
