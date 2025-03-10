const { getApi } = require("./api.controllers");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors.controllers");
const { getTopics } = require("./topics.controllers");

module.exports = {
  getApi,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
  getTopics,
};
