import Express from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../Controller/todoController.js";
import { validateToken } from "../Middleware/validateToken.js";

const todoRouter = Express.Router();
todoRouter.use(validateToken);
todoRouter.post("/create", createTask);
todoRouter.put("/update/:id", updateTask);
todoRouter.delete("/delete/:id", deleteTask);
todoRouter.get("/getall/:id", getTasks);

export default todoRouter;
