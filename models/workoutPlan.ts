import mongoose from "mongoose";

const workoutPlanSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    exercises: {
      type: Map,
      of: [
        {
          workoutId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workout",
            required: true,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const WorkoutPlan = mongoose.model("WorkoutPlan", workoutPlanSchema);

export default WorkoutPlan;
