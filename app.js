const express = require("express");
const cors = require("cors");
const router = require("./routes.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
var sequelize = require("./model").sequelize;

const app = express();
sequelize.sync();

app.use(
  cors({
    credentials: true
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "encryption",
    resave: false,
    saveUninitialized: false
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/", router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});

// serverless
// if (process.env.NODE_ENV !== "deploy") {
//   app.listen(5000, () => {
//     console.log("Listen on 5000");
//   });
// }

module.exports = app;
