const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const app = express();

const db = require("./config/connect.js");
const { predict } = require("./controller/predict.js");
const userRoute = require("./router/user.route.js");

// ✅ Set correct CORS for Vercel Frontend
// const FRONTEND_ORIGIN =
// process.env.FRONTEND_ORIGIN || "https://cvd-frontend.vercel.app" || "http://localhost:5173";
const FRONTEND_ORIGIN = "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(morgan("tiny"));
app.use(express.json({ limit: "2mb" }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 200 }));

db();

// ✅ Root route
app.get("/", (req, res) =>
  res.send("✅ Heart Disease Prediction API is running!")
);

// ✅ Prediction
app.post("/predict", predict);
app.use("/user", userRoute);

// ✅ Correct Render Port Binding
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Backend Live: ${PORT}`));

