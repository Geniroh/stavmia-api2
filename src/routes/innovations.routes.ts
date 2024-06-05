import express from "express";
import { uploadInnovation } from "../controllers/innovation.controller";

const router = express.Router();

router.post("/", uploadInnovation);

export default router;
