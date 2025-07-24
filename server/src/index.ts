import express from "express";
import samplesRoutes from "./routes/samplesRoutes";
import cors from "cors";

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',  // הכתובת המדויקת של ה-client שלך
  credentials: true,                // מאפשר cookies ו-auth headers
}));

app.use(express.json());
app.use("/api", samplesRoutes);

app.use('/sounds', express.static(path.join(__dirname, 'storage', 'sounds')));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
