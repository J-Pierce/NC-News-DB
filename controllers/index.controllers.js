const { getApi, unhandledPath } = require("./api.controllers");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors.controllers");
const { getTopics } = require("./topics.controllers");
const { getUsers } = require("./users.controllers");
const {
  getArticles,
  getArticlesById,
  patchArticleById,
} = require("./articles.controllers");
const {
  getCommentsByArticleId,
  postCommentsByArticleId,
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
  getArticles,
  getArticlesById,
  patchArticleById,
  getCommentsByArticleId,
  postCommentsByArticleId,
  removeCommentById,
};
