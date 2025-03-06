const { selectComments, selectCommentById } = require("../models/index.models");

exports.getComments = (request, response) => {
  selectComments().then(({ rows }) => {
    response.status(200).send({ comments: rows });
  });
};

exports.getCommentById = (request, response) => {
  const { commentsId } = request.params;
  selectCommentById(commentsId).then(({ rows }) => {
    response.status(200).send({ comment: rows[0] });
  });
};
