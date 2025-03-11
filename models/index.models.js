const { selectTopics } = require("./topics.models");
const {
  selectArticles,
  selectArticlesById,
  updateArticlesById,
} = require("./articles.models");
const {
  selectCommentsByArticleId,
  insertCommentsByArticleId,
} = require("./comments.models");

module.exports = {
  selectTopics,
  selectArticles,
  selectArticlesById,
  updateArticlesById,
  selectCommentsByArticleId,
  insertCommentsByArticleId,
};
