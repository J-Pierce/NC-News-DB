const express = require("express");
const app = express();
const apiRouter = require("./routes/api.router");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./controllers/index.controllers");
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use("/api", apiRouter);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
