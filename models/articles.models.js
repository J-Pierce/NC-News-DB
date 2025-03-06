const db = require("../db/connection.js");

const selectArticles = () => {
  return db.query("SELECT * FROM articles");
};

const selectArticleById = (articleId) => {
  return db.query("SELECT * FROM articles WHERE article_id = $1", [articleId]);
};

const selectArticlesByAuthor = (author) => {
  return db.query("SELECT * FROM articles WHERE author = $1", [author]);
};

const selectArticlesByTopic = (topic) => {
  return db.query("SELECT * FROM articles WHERE topic = $1", [topic]);
};

const selectArticlesByOrder = (order) => {
  return db.query("SELECT * FROM articles ORDER BY $1", [order]);
};

module.exports = {
  selectArticles,
  selectArticleById,
  selectArticlesByAuthor,
  selectArticlesByTopic,
  selectArticlesByOrder,
};
