import express from "express";
import Product from "../models/Product.js";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const products = await Product.find().limit(100);
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
