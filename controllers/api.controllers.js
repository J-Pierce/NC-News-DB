const endpoints = require("../endpoints.json");

exports.getApi = (request, response, next) => {
  return response.status(200).send({ endpoints: endpoints });
};
exports.unhandledPath = (request, response, next) => {
  return response.status(404).send({ msg: "Resource Not Found" });
};
