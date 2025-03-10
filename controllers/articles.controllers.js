const {
  selectArticles,
  selectArticlesById,
} = require("../models/index.models");

exports.getArticles = (request, response, next) => {
  return selectArticles()
    .then((rows) => {
      response.status(200).send({ articles: rows });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getArticlesById = (request, response, next) => {
  const article_id = request.params.article_id;
  return selectArticlesById(article_id)
    .then(({ rows }) => {
      response.status(200).send({ article: rows[0] });
    })
    .catch((error) => {
      next(error);
    });
};
