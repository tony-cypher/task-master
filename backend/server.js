import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// for parseing cookie in getMe .... okay
// app.use(cookieParser());

app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/notifications", notificationRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port 5000");
});
