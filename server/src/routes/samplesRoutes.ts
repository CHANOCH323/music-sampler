import { Router } from "express";
import samplesController from "../controllers/samplesController";

const router = Router();

router.get("/getAllSamples", samplesController.getSamples);

export default router;
