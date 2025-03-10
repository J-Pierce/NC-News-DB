const { selectCommentsByArticleId } = require("../models/index.models");

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
