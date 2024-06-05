// import express from 'express';
// import { connectDB } from './config/db';

// const app = express();

// app.listen(8080, () => {
//     console.log("Running")
//     connectDB()
// })

import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import uploadRoutes from "./routes/upload.routes";
import innovationRoutes from "./routes/innovations.routes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api", uploadRoutes);
app.use("/innovation", innovationRoutes);

app.post("/test", (req: Request, res: Response) => {
  console.log(req.body);
  res.json(req.body);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
