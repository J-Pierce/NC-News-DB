const {
  selectArticles,
  selectArticleById,
  selectArticlesByAuthor,
  selectArticlesByTopic,
  selectArticlesByOrder,
} = require("../models/index.models");

exports.getArticles = (request, response) => {
  const query = request.query;
  if (query.author) {
    return selectArticlesByAuthor(query.author).then(({ rows }) => {
      response.status(200).send({ articles: rows });
    });
  } else if (query.topic) {
    return selectArticlesByTopic(query.topic).then(({ rows }) => {
      response.status(200).send({ articles: rows });
    });
  } else if (query.order) {
    return selectArticlesByOrder(query.order).then(({ rows }) => {
      response.status(200).send({ articles: rows });
    });
  } else {
    return selectArticles().then(({ rows }) => {
      response.status(200).send({ articles: rows });
    });
  }
};

exports.getArticleById = (request, response) => {
  const { articleId } = request.params;
  return selectArticleById(articleId).then(({ rows }) => {
    response.status(200).send({ article: rows[0] });
  });
};
