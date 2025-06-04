import express from "express";
import orderModel from "../models/orderModel.js";

const orderRouter = express.Router();

orderRouter.post("/new", async (req, res) => {
  const { email, orderValue } = req.body;
  const result = await orderModel.create({ email, orderValue });
  return res.json(result);
});

export default orderRouter;
