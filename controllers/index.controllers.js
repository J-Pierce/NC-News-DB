const { getApi, getColumn } = require("./api.controllers");
const {
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errors.controllers");
//const {} = require("./topics.controllers");
const { getArticlesById } = require("./articles.controllers");
const { getCommentsByArticleId } = require("./comments.controllers");

module.exports = {
  getApi,
  getColumn,
  handlePsqlErrors,
  handleCustomErrors,
  handleServerErrors,
  getArticlesById,
  getCommentsByArticleId,
};
