import asyncHandler from "express-async-handler";
import UserModal from "../Model/userModel.js";
import errorHandler from "../Middleware/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  console.log("The request Body is: ", req.body);
  const { userName, userEmail, password, contactNumber } = req.body;
  if (!userName || !userEmail || !password || !contactNumber) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await UserModal.findOne({ userEmail });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password is: ", hashedPassword);
  const user = await UserModal.create({
    userName,
    userEmail,
    password: hashedPassword,
    contactNumber,
  });
  console.log("user details are: ", user);
  if (user) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.userEmail,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "1d" }
    );
    res.status(201).json(accessToken);
  } else {
    res.status(400);
    throw new Error("User data is not valid registered");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  console.log;
  const { userEmail, password } = req.body;
  if (!userEmail || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await UserModal.findOne({ userEmail });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.userEmail,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "1d" }
    );
    const refreshToken = jwt.sign(
      {
        user: {
          userName: user.userName,
          email: user.userEmail,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "30d" }
    );
    res.cookie("FStoken", accessToken);
    res.cookie("FSrefreshToken", refreshToken);
    res.status(200).json({ accessToken, refreshToken });
  } else {
    res.status(400);
    throw new Error("Email or Password is not valid.");
  }
});

const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export { registerUser, loginUser, currentUser };
