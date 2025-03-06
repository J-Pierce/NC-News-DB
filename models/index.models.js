const { selectTopics, selectTopicById } = require("./topics.models");
const { selectUsers, selectUserById } = require("./users.models");
const {
  selectArticles,
  selectArticleById,
  selectArticlesByAuthor,
  selectArticlesByTopic,
  selectArticlesByOrder,
} = require("./articles.models");
const { selectComments, selectCommentById } = require("./comments.models");

module.exports = {
  selectTopics,
  selectTopicById,
  selectUsers,
  selectUserById,
  selectArticles,
  selectArticleById,
  selectArticlesByAuthor,
  selectArticlesByTopic,
  selectArticlesByOrder,
  selectComments,
  selectCommentById,
};
