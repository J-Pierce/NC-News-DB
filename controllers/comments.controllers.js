const { selectComments, selectCommentById } = require("../models/index.models");

const getComments = (request, response) => {
  selectComments().then(({ rows }) => {
    response.status(200).send({ comments: rows });
  });
};

const getCommentById = (request, response) => {
  const { commentsId } = request.params;
  selectCommentById(commentsId).then(({ rows }) => {
    response.status(200).send({ comment: rows[0] });
  });
};

module.exports = { getComments, getCommentById };
