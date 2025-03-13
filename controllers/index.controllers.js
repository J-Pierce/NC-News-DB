const { getApi, unhandledPath } = require("./api.controllers");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors.controllers");
const { getTopics, postTopics } = require("./topics.controllers");
const { getUsers, getUserByUsername } = require("./users.controllers");
const {
  getArticles,
  postArticle,
  getArticleById,
  patchArticleById,
  removeArticleById,
} = require("./articles.controllers");
const {
  getComments,
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
  postTopics,
  getUsers,
  getUserByUsername,
  getArticles,
  postArticle,
  getArticleById,
  patchArticleById,
  removeArticleById,
  getComments,
  getCommentsByArticleId,
  postCommentsByArticleId,
  patchCommentById,
  removeCommentById,
};
