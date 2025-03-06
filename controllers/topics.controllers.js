const { selectTopics, selectTopicById } = require("../models/index.models");

const getTopics = (request, response) => {
  selectTopics().then(({ rows }) => {
    response.status(200).send({ topics: rows });
  });
};

const getTopicById = (request, response) => {
  const { topicId } = request.params;
  selectTopicById(topicId).then(({ rows }) => {
    response.status(200).send({ topic: rows[0] });
  });
};

module.exports = { getTopics, getTopicById };
