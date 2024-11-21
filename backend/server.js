import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// to parse req.body
// app.use(express.json());

// to parse form data(urlencoded)
// app.use(express.urlencoded({ extended: true }));

// for parseing cookie in getMe .... okay
// app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

//app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/posts", postRoutes);
// app.use("/api/notifications", notificationRoutes);

app.listen(PORT, () => {
  //connectDB();
  console.log("Server is running on port 5000");
});
