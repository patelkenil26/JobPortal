import express from "express";
import { createScheduleMeeting } from "../controllers/scheduleMeetingController.js";
// import { isAuthenticated } from "../middlewares/auth";
const router = express.Router();

router.post("/meeting/:id",createScheduleMeeting);

export default router;