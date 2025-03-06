const {
  selectArticles,
  selectArticleById,
  selectArticlesByAuthor,
  selectArticlesByTopic,
  selectArticlesByOrder,
} = require("../models/index.models");

const getArticles = (request, response) => {
  const query = request.query;
  if (query.author) {
    selectArticlesByAuthor(query.author).then(({ rows }) => {
      response.status(200).send({ articles: rows });
    });
  } else if (query.topic) {
    selectArticlesByTopic(query.topic).then(({ rows }) => {
      response.status(200).send({ articles: rows });
    });
  } else if (query.order) {
    selectArticlesByOrder(query.order).then(({ rows }) => {
      response.status(200).send({ articles: rows });
    });
  } else {
    selectArticles().then(({ rows }) => {
      response.status(200).send({ articles: rows });
    });
  }
};

const getArticleById = (request, response) => {
  const { articleId } = request.params;
  selectArticleById(articleId).then(({ rows }) => {
    response.status(200).send({ article: rows[0] });
  });
};

module.exports = { getArticles, getArticleById };
