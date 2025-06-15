import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    memberId: {
      type: String,
      required: false,
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
      type: String,
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
      required: false,
    },
    lastExit: {
      type: Date,
      required: false,
    },
    totalDaysPresent: {
      type: Number,
      required: false,
    },
    alertSentForRenewal: {
      type: Boolean,
      required: false,
    },
    alertSentForAbsence: {
      type: Boolean,
      required: false,
    },
    medicalConditions: {
      type: String,
      required: true,
    },
    passportPhoto: {
      type: Buffer,
      required: false,
    },
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);

export default Member;
