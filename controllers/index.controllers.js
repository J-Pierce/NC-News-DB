const { getApi } = require("./api.controllers");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors.controllers");
const { getTopics } = require("./topics.controllers");
const { getArticlesById } = require("./articles.controllers");

module.exports = {
  getApi,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
  getTopics,
  getArticlesById,
};
