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

const allowedOrigins = [
  "http://localhost:5173",
  "https://khelio-nu.vercel.app",
  // add your custom domain later:
  // 'https://khelio.com.np',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, // REQUIRED for cookies/auth to work
  }),
);
app.use(cookieParser()); // <-- ADD THIS LINE
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/efootball", efootballRoutes);

app.get("/", (req, res) => res.json({ message: "API Running" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
