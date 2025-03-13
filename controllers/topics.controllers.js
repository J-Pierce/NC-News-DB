const { selectTopics, insertTopics } = require("../models/index.models");

exports.getTopics = (request, response, next) => {
  return selectTopics()
    .then(({ rows }) => {
      return response.status(200).send({ topics: rows });
    })
    .catch((error) => {
      next(error);
    });
};
exports.postTopics = (request, response, next) => {
  const { slug, description, img_url } = request.body;
  insertTopics(slug, description, img_url)
    .then(({ rows }) => {
      response.status(201).send({ newTopic: rows[0] });
    })
    .catch((error) => {
      next(error);
    });
};
