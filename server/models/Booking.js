import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cabinId: { type: mongoose.Schema.Types.ObjectId, ref: "Cabin", required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

export default mongoose.model("Booking", bookingSchema);