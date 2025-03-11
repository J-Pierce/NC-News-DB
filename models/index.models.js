const { selectTopics } = require("./topics.models");
const { selectUsers } = require("./users.models");
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
  selectUsers,
  selectArticles,
  selectArticlesById,
  updateArticlesById,
  selectCommentsByArticleId,
  insertCommentsByArticleId,
  deleteCommentById,
};
