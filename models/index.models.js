const { selectTopics, insertTopics } = require("./topics.models");
const { selectUsers, selectUserByUsername } = require("./users.models");
const {
  selectArticles,
  insertArticle,
  selectArticleById,
  updateArticlesById,
} = require("./articles.models");
const {
  selectCommentsByArticleId,
  insertCommentsByArticleId,
  updateCommentById,
  deleteCommentById,
} = require("./comments.models");

module.exports = {
  selectTopics,
  insertTopics,
  selectUsers,
  selectUserByUsername,
  selectArticles,
  insertArticle,
  selectArticleById,
  updateArticlesById,
  selectCommentsByArticleId,
  insertCommentsByArticleId,
  updateCommentById,
  deleteCommentById,
};
