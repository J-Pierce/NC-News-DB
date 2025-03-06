const db = require("../db/connection.js");

exports.selectArticles = () => {
  return db.query("SELECT * FROM articles");
};

exports.selectArticleById = (articleId) => {
  return db.query("SELECT * FROM articles WHERE article_id = $1", [articleId]);
};

exports.selectArticlesByAuthor = (author) => {
  return db.query("SELECT * FROM articles WHERE author = $1", [author]);
};

exports.selectArticlesByTopic = (topic) => {
  return db.query("SELECT * FROM articles WHERE topic = $1", [topic]);
};

exports.selectArticlesByOrder = (order) => {
  return db.query("SELECT * FROM articles ORDER BY $1", [order]);
};
