const { selectTopics } = require("../models/index.models");

exports.getTopics = (request, response, next) => {
  const query = request.query;
  return selectTopics(query)
    .then(({ rows }) => {
      response.status(200).send({ topics: rows });
    })
    .catch((error) => {
      next(error);
    });
};
