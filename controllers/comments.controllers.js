const {
  selectCommentsByArticleId,
  insertCommentsByArticleId,
  updateCommentById,
  deleteCommentById,
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
  const { article_id } = request.params;
  const { username, body } = request.body;
  insertCommentsByArticleId(article_id, username, body)
    .then(({ rows }) => {
      response.status(201).send({ newComment: rows[0] });
    })
    .catch((error) => {
      next(error);
    });
};
exports.patchCommentById = (request, response, next) => {
  const { comment_id } = request.params;
  const { inc_votes } = request.body;
  return updateCommentById(comment_id, inc_votes)
    .then(({ rows }) => {
      response.status(200).send({ updatedComment: rows[0] });
    })
    .catch((error) => {
      next(error);
    });
};
exports.removeCommentById = (request, response, next) => {
  const { comment_id } = request.params;
  deleteCommentById(comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
};
