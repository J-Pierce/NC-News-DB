const { selectTopics } = require("./topics.models");
const { selectArticles, selectArticlesById } = require("./articles.models");

module.exports = { selectTopics, selectArticles, selectArticlesById };
