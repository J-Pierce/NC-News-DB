const express = require("express");
const app = express();
const {
  getApi,
  unhandledPath,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
  getTopics,
  getUsers,
  getArticles,
  getArticlesById,
  patchArticleById,
  getCommentsByArticleId,
  postCommentsByArticleId,
  removeCommentById,
} = require("./controllers/index.controllers");

app.use(express.json());

app.get("/api", getApi);
app.get("/api/topics", getTopics);
app.get("/api/users", getUsers);
app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticlesById);
app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.post("/api/articles/:article_id/comments", postCommentsByArticleId);

app.delete("/api/comments/:comment_id", removeCommentById);

app.all("*", unhandledPath);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
