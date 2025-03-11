const endpoints = require("../endpoints.json");
const { getTopics } = require("./topics.controllers");
const { getArticles } = require("./articles.controllers");

exports.getApi = (request, response, next) => {
  return response.status(200).send({ endpoints: endpoints });
};

exports.unhandledPath = (request, response, next) => {
  return response.status(404).send({ msg: "Resource Not Found" });
};
