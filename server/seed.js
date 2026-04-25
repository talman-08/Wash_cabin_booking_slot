import mongoose from "mongoose";
import dotenv from "dotenv";
 

import User from "./models/User.js";
import Cabin from "./models/Cabin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.deleteMany();
await Cabin.deleteMany();

await User.insertMany([
  { name: "Emma Svensson", email: "emma@mail.se", apartmentNumber: "A12" },
  { name: "Liam Andersson", email: "liam@mail.se", apartmentNumber: "B21" }
]);

await Cabin.insertMany([
  { cabinName: "Cabin 1", location: "Basement" },
  { cabinName: "Cabin 2", location: "Floor 1" }
]);

console.log("Seed data inserted");
process.exit();