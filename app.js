const express = require("express");

const path = require("path");

const bodyParser = require("body-parser");

const app = express();

const loginRoute = require("./routes/route.js");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(loginRoute);

app.listen(4000);
