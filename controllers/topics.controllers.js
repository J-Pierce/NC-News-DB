const { selectTopics } = require("../models/index.models");

exports.getTopics = (request, response, next) => {
  return selectTopics()
    .then(({ rows }) => {
      response.status(200).send({ topics: rows });
    })
    .catch((error) => {
      next(error);
    });
};
