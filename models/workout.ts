import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    workoutId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    muscle: {
      type: String,
      required: true,
    },
    secondaryMuscle: {
      type: Array,
    },
    type: {
      type: String,
    },
    equipment: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
    },
  },
  { timestamps: true }
);

const Workout = mongoose.model("Admin", workoutSchema);

export default Workout;
