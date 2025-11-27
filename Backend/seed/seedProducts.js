import dotenv from "dotenv";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import connectDB from "../config/db.js";
import Product from "../models/Product.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const sample = JSON.parse(readFileSync(join(__dirname, "./sampleProducts.json"), "utf-8"));

(async function () {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(sample);
    console.log("✅ Products Seeded Successfully!");
    console.log(`📦 Total products: ${sample.length}`);
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
})();
