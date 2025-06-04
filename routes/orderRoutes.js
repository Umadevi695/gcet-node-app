import express from "express";
import orderModel from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post("/new", async (req, res) => {
  const { email, price } = req.body;
  const result = orderModel.insertOne({ email, price });
  return res.json(result);
});

export default orderRouter;
