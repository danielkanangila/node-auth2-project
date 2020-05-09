const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const authRouter = require("./auth/auth-router");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/api", routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "An error occurred." });
});
