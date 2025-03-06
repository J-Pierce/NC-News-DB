const express = require("express");
const app = express();
const {
  getApi,
  getTopics,
  getTopicById,
  getUsers,
  getUserById,
  getArticles,
  getArticleById,
  getComments,
  getCommentById,
} = require("./controllers/index.controllers.js");

app.get("/api", getApi);

app.get("/api/topics", getTopics);
app.get("/api/topics/:topicId", getTopicById);
app.get("/api/topics")

app.get("/api/users", getUsers);
app.get("/api/users/:userId", getUserById);

app.get("/api/articles", getArticles);
app.get("/api/articles/:articleId", getArticleById);

app.get("/api/comments", getComments);
app.get("/api/comments/:commentId", getCommentById);

module.exports = app;
