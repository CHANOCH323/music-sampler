import express from "express";
import samplesRoutes from "./routes/samplesRoutes";
import cors from "cors";
import {  usersRoutes } from './routes/usersRouts';
import errorHandler from './middleware/errorHandler';

const allowedOrigins = ['https://music-sampler-x6me.vercel.app',
              'http://localhost:5173']

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({

  origin: allowedOrigins, 
  credentials: true,                

}));

app.use(express.json());


app.use("/api/samples", samplesRoutes);
app.use('/api/users', usersRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
