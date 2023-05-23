import Express from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../Controller/userController.js";
import { validateToken } from "../Middleware/validateToken.js";

const userRouter = Express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/current", validateToken, currentUser);

export default userRouter;
