const express = require("express");
const app = express();
const {
  getApi,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
  getTopics,
  getArticlesById,
} = require("./controllers/index.controllers");

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesById);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
