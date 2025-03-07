const { getApi } = require("./api.controllers.js");
const { getArticles, getArticleById } = require("./articles.controllers.js");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors.controllers.js");
module.exports = {
  getApi,
  getArticles,
  getArticleById,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
};
