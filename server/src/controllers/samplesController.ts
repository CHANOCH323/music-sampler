import { Request, Response, NextFunction } from "express";
import samplesService from "../services/samplesService";

export async function getSamplesController(req: Request, res: Response, next: NextFunction) {
  console.log("----------getSamples controller----------");
  try {
    const samples = await samplesService.getAllSamples();
    console.log("----------END getSamples controller----------");
    res.json(samples);
    return;
  } catch (error: any) {
    console.error("getSamples error:", error);
    next(error);  // מעביר הלאה לטיפול בשגיאות ב-Express
    return;
  }
}

export async function saveBeatController(req: Request, res: Response, next: NextFunction) {
  console.log("----------saveBeat controller----------");
  try {
    const beatData = req.body as { grid: boolean[][]; toolTypeId: number; name?: string };
    const token = req.cookies.token;

    const savedBeat = await samplesService.saveBeat(token, beatData);

    console.log("----------END saveBeat controller----------");
    res.status(201).json(savedBeat);
  } catch (error: any) {
    console.error("saveBeat error:", error);
    next(error);
  }
}

// הוספת הפונקציה לקבלת מקצבים של משתמש לפי טוקן:
export async function getUserBeatsController(req: Request, res: Response, next: NextFunction) {
  console.log("----------getUserBeats controller----------");
  try {
    const token = req.cookies.token;

    // קוראים לסרוויס שמחזיר את כל המקצבים של המשתמש לפי הטוקן
    const beats = await samplesService.getUserBeats(token);

    console.log("----------END getUserBeats controller----------");
    res.json(beats);
  } catch (error: any) {
    console.error("getUserBeats error:", error);
    next(error);
  }
}
