const apiRouter = require("express").Router();

const topicsRouter = require("./topics.router");
const usersRouter = require("./users.router");
const articlesRouter = require("./articles.router");
const commentsRouter = require("./comments.router");
const { getApi, unhandledPath } = require("../controllers/index.controllers");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

apiRouter.route("/").get(getApi);
apiRouter.route("*").get(unhandledPath);

module.exports = apiRouter;
