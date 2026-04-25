import Booking from "../models/Booking.js";

 export const createBooking = async (req, res) => {
  try {
    const { cabinId, date, startTime, endTime } = req.body;

    const existing = await Booking.findOne({
      cabinId,
      date,
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime }
        }
      ]
    });

    if (existing) {
      return res.status(409).json({
        message: "This time slot is already booked!"
      });
    }

    const booking = await Booking.create(req.body);
    res.status(201).json(booking);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





export const getBookings = async (req, res) => {
  try {
    const { date } = req.query;

    const filter = date ? { date } : {};

    const bookings = await Booking.find(filter)
      .populate("userId")
      .populate("cabinId");

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};