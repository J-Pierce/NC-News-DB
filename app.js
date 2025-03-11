const express = require("express");
const app = express();
const {
  getApi,
  getColumn,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
  getArticlesById,
  getCommentsByArticleId,
  postCommentsByArticleId
} = require("./controllers/index.controllers");

app.use(express.json());

app.get("/api", getApi);
app.get("/api/:column", getColumn);
app.get("/api/articles/:article_id", getArticlesById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
