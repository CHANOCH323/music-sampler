import express from "express";
import samplesRoutes from "./routes/samplesRoutes";

const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", samplesRoutes);

app.use('/sounds', express.static(path.join(__dirname, 'storage', 'sounds')));


app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
