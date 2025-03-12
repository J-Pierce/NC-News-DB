const {
  selectArticles,
  selectArticleById,
  updateArticlesById,
} = require("../models/index.models");

exports.getArticles = (request, response, next) => {
  const { sort_by, order, topic, ...rest } = request.query;
  return selectArticles(sort_by, order, topic, rest)
    .then(({ rows }) => {
      response.status(200).send({ articles: rows });
    })
    .catch((error) => {
      next(error);
    });
};
exports.getArticleById = (request, response, next) => {
  const { article_id } = request.params;
  return selectArticleById(article_id)
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
