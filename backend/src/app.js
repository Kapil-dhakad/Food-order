const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

// Routes import
const foodRouter = require("./routes/food.route");
const userRouter = require("./routes/user.route");
const cartRouter = require("./routes/cart.route");
const orderRouter = require("./routes/order.route");

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/food", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// 🟢 Serve Frontend (user app)
app.use(
  "/frontend",
  express.static(path.join(__dirname, "../public/frontend"))
);
app.get("/frontend/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/frontend/index.html"));
});

// 🟢 Serve Admin Panel
app.use(
  "/admin",
  express.static(path.join(__dirname, "../public/admin"))
);
app.get("/admin/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/admin/index.html"));
});

module.exports = app;
