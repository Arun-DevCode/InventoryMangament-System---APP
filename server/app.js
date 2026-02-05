import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import
import DBConnection from "./config/db.config.js";

// Routers
import UserRouter from "./router/userRoute.js";
import PostRouter from "./router/postRoute.js";

// Config
dotenv.config();
const app = express();

// Middleware
app.use(express.json()); // body parser : JSON -> Object
app.use(cors());

// Routes
app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter);

// Database
DBConnection();

// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
