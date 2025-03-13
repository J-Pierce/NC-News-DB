const { selectTopics, insertTopics } = require("./topics.models");
const { selectUsers, selectUserByUsername } = require("./users.models");
const {
  selectArticles,
  insertArticle,
  selectArticleById,
  updateArticlesById,
  deleteArticleById,
} = require("./articles.models");
const {
  selectComments,
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
  deleteArticleById,
  selectComments,
  selectCommentsByArticleId,
  insertCommentsByArticleId,
  updateCommentById,
  deleteCommentById,
};
