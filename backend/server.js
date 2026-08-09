import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import efootballRoutes from "./routes/efootballRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser()); // <-- ADD THIS LINE
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/efootball", efootballRoutes);

app.get("/", (req, res) => res.json({ message: "API Running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
