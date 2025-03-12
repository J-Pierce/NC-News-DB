const { getUsers, unhandledPath } = require("../controllers/index.controllers");
const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers);

usersRouter.route("*").get(unhandledPath);

module.exports = usersRouter;
