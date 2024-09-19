const express = require("express");
const app = express();
const port = 5000;
const bcrypt = require("bcrypt");

const mongoose = require("mongoose");
const cors = require("cors");
const MyError = require("./models/MyError");
const expenseRouter = require("./routes/expense-route");

//const cookieParser = require("cookie-parser");

// const corsOptions = {
//   origin: "http://localhost:3000", // Replace with your React app's domain
//   credentials: true,
// };
//app.use("/uploads/files", express.static(__dirname + "/uploads/files"));
//app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(cors(corsOptions));
mongoose.connect("mongodb://localhost:27017/expense", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
const corsOptions = {
  origin: "*", // Allow requests from any origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  credentials: true, // Allow cookies or authorization headers
};

// Use the cors middleware with the options
app.use(cors(corsOptions));
app.use("/api/expense/expenses", expenseRouter);

// app.use("/api/blog/comments", commentRouter);
// app.use("/api/blog/user", userRouter);
app.use((req, res, next) => {
  let error = new MyError("not able to find page");
  error.errorCode = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  //console.log(error);
  console.log("error controller", error.message);
  const errorCode = error.code || 500;
  const errorMsg = error.message || "unknown error occurd";
  const errorObject = error.errors || {};
  res.status(errorCode);
  res.json({ status: "fail", msg: errorMsg, errorObject });
});
