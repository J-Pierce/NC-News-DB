const {
  selectArticles,
  insertArticle,
  selectArticleById,
  updateArticlesById,
} = require("../models/index.models");

exports.getArticles = (request, response, next) => {
  const { sort_by, order, topic, limit, p, ...rest } = request.query;
  return selectArticles(sort_by, order, topic, limit, p, rest)
    .then(({ rows }) => {
      response.status(200).send({ articles: rows });
    })
    .catch((error) => {
      next(error);
    });
};
exports.postArticle = (request, response, next) => {
  const { author, title, body, topic, article_img_url } = request.body;
  insertArticle(author, title, body, topic, article_img_url)
    .then(({ rows }) => {
      response.status(201).send({ newArticle: rows[0] });
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
