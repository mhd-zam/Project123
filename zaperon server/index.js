const express = require("express");
const app = express();
const createError=require('http-errors')
const port = 5000;
const userRouter = require("./router/user");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
)

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose
  .connect(process.env.DATABASE, {
    dbName: "zaperon",
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", userRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log("server running");
});
