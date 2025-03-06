const { selectTopics, selectTopicById } = require("../models/index.models");

exports.getTopics = (request, response) => {
  selectTopics().then(({ rows }) => {
    response.status(200).send({ topics: rows });
  });
};

exports.getTopicById = (request, response) => {
  const { topicId } = request.params;
  selectTopicById(topicId).then(({ rows }) => {
    response.status(200).send({ topic: rows[0] });
  });
};
{}