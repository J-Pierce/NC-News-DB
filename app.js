const express = require("express");
const app = express();
const {
  getApi,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
  getTopics,
} = require("./controllers/index.controllers");

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
