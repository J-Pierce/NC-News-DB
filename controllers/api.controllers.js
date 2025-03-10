const endpoints = require("../endpoints.json");
const { getTopics } = require("./topics.controllers");
const { getArticles } = require("./articles.controllers");

exports.getApi = (request, response, next) => {
  return response.status(200).send({ endpoints: endpoints });
};

exports.getColumn = (request, response, next) => {
  const column = request.params.column;
  if (column === "topics") {
    getTopics(request, response, next);
  } else if (column === "articles") {
    getArticles(request, response, next);
  } else {
    return response.status(404).send({ msg: "Resource Not Found" });
  }
};
