import express from "express";
import { getCabins, createCabin } from "../controllers/cabinController.js";

const router = express.Router();

router.get("/", getCabins);
router.post("/", createCabin);

export default router;