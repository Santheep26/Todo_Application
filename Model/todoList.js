import mongoose, { model } from "mongoose";

const todoList = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    taskName: {
      type: String,
      required: [true, "task Name is mandatory"],
    },
    taskDiscription: {
      type: String,
      required: [true, "Discription is mandatory"],
    },
    taskTAT: {
      type: String,
      required: [true, "TAT is mandatory for Task"],
    },
  },
  {
    timestamps: true,
  }
);

const todolistModel = model("task", todoList);

export default todolistModel;
