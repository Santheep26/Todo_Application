import asyncHandler from "express-async-handler";
import todolistModel from "../Model/todoList.js";

const createTask = asyncHandler(async (req, res, next) => {
  try {
    console.log("The request Body is: ", req.body);
    const { taskName, taskDiscription, taskTAT } = req.body;
    const task = await todolistModel.create({
      taskName,
      taskDiscription,
      taskTAT,
      user_id: req.user.id,
    });
    console.log("Task details are: ", task);
    return res.status(201).json(task);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
const updateTask = asyncHandler(async (req, res) => {
  const getTaskById = await todolistModel.findById(req.params.id);
  if (!getTaskById) {
    res.status(404);
    throw new Error("Task not found");
  }
  if (getTaskById.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to update other user tasks");
  }
  console.log("Fectched task detail is: ", getTaskById);
  const updatedTask = await todolistModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedTask);
});
const deleteTask = asyncHandler(async (req, res) => {
  const getTaskById = await todolistModel.findById(req.params.id);
  if (!getTaskById) {
    res.status(404);
    throw new Error("Task not found");
  }
  console.log("Fectched task detail is: ", getTaskById);
  if (getTaskById.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User dont have permission to delete other user tasks");
  }
  const deletedTask = await todolistModel.findByIdAndRemove(req.params.id);
  res.status(200).json({
    message: "Task deleted successfully",
  });
});

const getTasks = asyncHandler(async (req, res) => {
  const getAllTasks = await todolistModel.find({ user_id: req.user.id });
  if (!getAllTasks) {
    res.status(404);
    throw new Error("Contacts not found");
  }
  console.log("Fectched Task details is: ", getAllTasks);
  res.status(200).json(getAllTasks);
});
export { createTask, updateTask, deleteTask, getTasks };
