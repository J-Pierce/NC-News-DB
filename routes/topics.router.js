const {
  getTopics,
  postTopics,
  unhandledPath,
} = require("../controllers/index.controllers");
const topicsRouter = require("express").Router();

topicsRouter.route("/").get(getTopics).post(postTopics);

topicsRouter.route("*").get(unhandledPath);

module.exports = topicsRouter;
