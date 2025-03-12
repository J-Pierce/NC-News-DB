const {
  getTopics,
  unhandledPath,
} = require("../controllers/index.controllers");
const topicsRouter = require("express").Router();

topicsRouter.route("/").get(getTopics);

topicsRouter.route("*").get(unhandledPath);

module.exports = topicsRouter;
