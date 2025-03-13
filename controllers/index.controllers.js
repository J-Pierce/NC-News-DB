const { getApi, unhandledPath } = require("./api.controllers");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors.controllers");
const { getTopics } = require("./topics.controllers");
const { getUsers, getUserByUsername } = require("./users.controllers");
const {
  getArticles,
  postArticle,
  getArticleById,
  patchArticleById,
} = require("./articles.controllers");
const {
  getCommentsByArticleId,
  postCommentsByArticleId,
  patchCommentById,
  removeCommentById,
} = require("./comments.controllers");

module.exports = {
  getApi,
  unhandledPath,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
  getTopics,
  getUsers,
  getUserByUsername,
  getArticles,
  postArticle,
  getArticleById,
  patchArticleById,
  getCommentsByArticleId,
  postCommentsByArticleId,
  patchCommentById,
  removeCommentById,
};
