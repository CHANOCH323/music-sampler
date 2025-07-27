import { Router } from "express";
import {getSamplesController,saveBeatController,getUserBeatsController} from "../controllers/samplesController";

const router = Router();

router.get("/getAllSamples", getSamplesController);
router.get("/user/:userId",getUserBeatsController)
router.post("/saveUserBeat",saveBeatController)


export default router;
