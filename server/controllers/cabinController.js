import Cabin from "../models/Cabin.js";

export const getCabins = async (req, res) => {
  const cabins = await Cabin.find();
  res.json(cabins);
};

export const createCabin = async (req, res) => {
  const cabin = await Cabin.create(req.body);
  res.json(cabin);
};