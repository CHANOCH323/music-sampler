import { Router } from "express";
import samplesController from "../controllers/samplesController";

const router = Router();

router.get("/samples", samplesController.getSamples);

export default router;
