const { selectTopics } = require("./topics.models");
const { selectArticles, selectArticlesById } = require("./articles.models");
const { selectCommentsByArticleId } = require("./comments.models");

module.exports = {
  selectTopics,
  selectArticles,
  selectArticlesById,
  selectCommentsByArticleId,
};
