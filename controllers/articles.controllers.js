const {
  selectArticles,
  selectArticlesById,
  updateArticlesById,
} = require("../models/index.models");

exports.getArticles = (request, response, next) => {
  const { sort_by, order } = request.query;
  return selectArticles(sort_by, order)
    .then(({ rows }) => {
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

exports.patchArticleById = (request, response, next) => {
  const { article_id } = request.params;
  const { inc_votes } = request.body;
  return updateArticlesById(article_id, inc_votes)
    .then(({ rows }) => {
      response.status(200).send({ updatedArticle: rows[0] });
    })
    .catch((error) => {
      next(error);
    });
};
