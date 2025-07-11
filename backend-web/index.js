import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorHandler } from "./src/middleware/errorHandler.js";
import authRoutes from "./src/auth/auth.route.js";
import databaseRoutes from "./src/database/database.routes.js";
import session from "express-session";

dotenv.config({ quiet: true });

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false, 
    maxAge: 1000 * 60 * 60 * 1 }, // 1 hour
    sameSite: 'lax',
}));

app.get("/", (req, res) => {
  res.send("Hello from the backend web service!");
});

app.use("/api/auth", authRoutes);
app.use("/api/database", databaseRoutes);

app.use(errorHandler);

const PORT = process.env.BACKEND_NODE_PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Backend web service is running on port http://localhost:${PORT}`
  );
});
