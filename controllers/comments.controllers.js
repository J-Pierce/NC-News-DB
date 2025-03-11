const {
  selectCommentsByArticleId,
  insertCommentsByArticleId,
} = require("../models/index.models");

exports.getCommentsByArticleId = (request, response, next) => {
  const article_id = request.params.article_id;
  return selectCommentsByArticleId(article_id)
    .then(({ rows }) => {
      response.status(200).send({ comments: rows });
    })
    .catch((error) => {
      next(error);
    });
};

exports.postCommentsByArticleId = (request, response, next) => {
  const article_id = request.params.article_id;
  const data = request.body;
  insertCommentsByArticleId(article_id, data)
    .then(({ rows }) => {
      response.status(201).send({ newComment: rows[0] });
    })
    .catch((error) => {
      next(error);
    });
};
