const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000",
      "https://mern-xchat.vercel.app",
     ], // frontend
    
    credentials: true,               // 🔥 REQUIRED
  })
);

app.use(express.json());
app.use(cookieParser());

// routes
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");

app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

module.exports = app;
