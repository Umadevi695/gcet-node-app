/*import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";

const userRouter = express.Router();
import jwt from "jsonwebtoken";
const SECRET_KEY = "helloworld";

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  const hashpassword = await bcrypt.hash(pass, 10);
  const result = await userModel.create({
    name: name,
    email: email,
    pass: hashpassword,
  });
  return res.json(result);
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const result = await userModel.findOne({ email });
  if (!result) return res.json({ message: "Invalid user" });
  const matchPassword = await bcrypt.compare(pass, result.pass);
  if (!matchPassword) {
    return res.status(400).json({ message: "Invalid Password" });
  }
  const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
  console.log(result);
  return res.json({ user: result, token: token });
});
userRouter.get("/:id", async (req, res) => {
  const email = req.params.id;
  const result = await userModel.findOne({ email });
  return res.json(result);
});

userRouter.get("/:id/name", async (req, res) => {
  const email = req.params.id;
  const result = await userModel.findOne({ email }, { _id: 0, name: 1 });
  return res.json(result);
});

export default userRouter;*/

/*import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
const userRouter = express.Router();
import jwt from "jsonwebtoken";
const SECRET_KEY = "helloworld";

userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  // const hashpassword = await bcrypt.hash(pass, 10);
  const result = await userModel.create({
    name: name,
    email: email,
    pass: pass,
    //  pass: hashpassword,
  });
  return res.json(result);
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const result = await userModel.findOne({ email });
  if (!result) return res.json({ message: "Invalid user" });
  // const matchPassword = await bcrypt.compare(pass, result.pass);
  // if (!matchPassword) {
  //   return res.status(400).json({ message: "Invalid Password" });
  // }
  const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
  console.log(result);
  return res.json({ user: result, token: token });
});

export default userRouter;*/

import express from "express";
import userModel from "../models/userModel.js";

const userRouter = express.Router();

// Register route - saves password as plain text
userRouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;

  // Optional: Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const result = await userModel.create({
    name,
    email,
    pass, // plain-text password (⚠ for learning only)
  });

  return res.json({ message: "Registration successful", user: result });
});

// Login route - compares raw password directly
userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  const result = await userModel.findOne({ email });
  if (!result) {
    return res.status(400).json({ message: "Invalid user" });
  }

  if (result.pass !== pass) {
    return res.status(400).json({ message: "Invalid password" });
  }

  return res.json({ message: "Login successful", user: result });
});

// Get full user by email
userRouter.get("/:id", async (req, res) => {
  const email = req.params.id;
  const result = await userModel.findOne({ email });
  return res.json(result);
});

// Get only name of user by email
userRouter.get("/:id/name", async (req, res) => {
  const email = req.params.id;
  const result = await userModel.findOne({ email }, { _id: 0, name: 1 });
  return res.json(result);
});

export default userRouter;
