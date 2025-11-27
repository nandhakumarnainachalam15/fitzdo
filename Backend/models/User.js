import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, default: "User" },
    role: { type: String, default: "Customer", enum: ["Customer", "Admin", "Super-Admin"] },
    phone: { type: String, default: "" },
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      zipCode: { type: String, default: "" },
      country: { type: String, default: "India" }
    },
    profilePicture: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
