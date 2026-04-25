import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cabinRoutes from "./routes/cabinRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cabins", cabinRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));









// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// import bookingRoutes from "./routes/bookingRoutes.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/bookings", bookingRoutes);

// app.get("/", (req, res) => {
//   res.send("API running...");
// });

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(5000, () => console.log("Server running on port 5000"));
//   })
//   .catch(err => console.log(err));