const { selectTopics } = require("./topics.models");
const {
  selectArticles,
  selectArticlesById,
  updateArticlesById,
} = require("./articles.models");
const {
  selectCommentsByArticleId,
  insertCommentsByArticleId,
  deleteCommentById,
} = require("./comments.models");

module.exports = {
  selectTopics,
  selectArticles,
  selectArticlesById,
  updateArticlesById,
  selectCommentsByArticleId,
  insertCommentsByArticleId,
  deleteCommentById,
};
