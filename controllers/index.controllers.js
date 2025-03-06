const { getApi } = require("./api.controllers.js");
const { getTopics, getTopicById } = require("./topics.controllers.js");
const { getUsers, getUserById } = require("./users.controllers.js");
const { getArticles, getArticleById } = require("./articles.controllers.js");
const { getComments, getCommentById } = require("./comments.controllers.js");

module.exports = {
  getApi,
  getTopics,
  getTopicById,
  getUsers,
  getUserById,
  getArticles,
  getArticleById,
  getComments,
  getCommentById,
};
