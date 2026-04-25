import mongoose from "mongoose";

const cabinSchema = new mongoose.Schema({
  cabinName: { type: String, required: true },
  location: { type: String, required: true }
});

export default mongoose.model("Cabin", cabinSchema);