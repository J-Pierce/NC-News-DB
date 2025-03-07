const express = require("express");
const app = express();
const {
  getApi,
  getArticles,
  getArticleById,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./controllers/index.controllers.js");

app.get("/api", getApi);

// Articles requests
app.get("/api/articles", getArticles);
app.get("/api/articles/:articleId", getArticleById);

// Error handling
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
