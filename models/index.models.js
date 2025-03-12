const { selectTopics } = require("./topics.models");
const { selectUsers, selectUserByUsername } = require("./users.models");
const {
  selectArticles,
  selectArticleById,
  updateArticlesById,
} = require("./articles.models");
const {
  selectCommentsByArticleId,
  insertCommentsByArticleId,
  deleteCommentById,
} = require("./comments.models");

module.exports = {
  selectTopics,
  selectUsers,
  selectUserByUsername,
  selectArticles,
  selectArticleById,
  updateArticlesById,
  selectCommentsByArticleId,
  insertCommentsByArticleId,
  deleteCommentById,
};
