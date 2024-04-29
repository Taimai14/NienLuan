const express = require("express");
const cors = require("cors");
const port = 3000;
const userRoute = require("./src/routes/user");
const authRoute = require("./src/routes/auth");
const movieRoute = require("./src/routes/movie");
const listRoute = require("./src/routes/list");
const db = require("./src/config/db");

db.connect();

const app = express();
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.use(cors({ origin: "*" }));
app.use(express.json());
console.log("servser chay o host", port);

app.use("/api/movies", movieRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/lists", listRoute);

app.listen(port, () => {
  console.log("backend dang chay!");
});
