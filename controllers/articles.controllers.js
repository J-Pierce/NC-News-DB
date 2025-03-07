const { selectArticles, selectArticleById } = require("../models/index.models");

exports.getArticles = (request, response, next) => {
  const query = request.query;
  return selectArticles(query)
    .then(({ rows }) => {
      response.status(200).send({ articles: rows });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getArticleById = (request, response, next) => {
  const { articleId } = request.params;
  return selectArticleById(articleId)
    .then(({ rows }) => {
      response.status(200).send({ article: rows[0] });
    })
    .catch((error) => {
      next(error);
    });
};
