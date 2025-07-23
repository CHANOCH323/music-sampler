import { Request, Response } from "express";
import samplesService from "../services/samplesService";

const getSamples = async (req: Request, res: Response) => {
  try {
    const samples = await samplesService.getAllSamples();
    res.json(samples);
  } catch (error) {
    res.status(500).json({ message: "Error fetching samples" });
  }
};

export default {
  getSamples,
};
