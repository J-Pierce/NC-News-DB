const { getUsers, getUserByUsername, unhandledPath } = require("../controllers/index.controllers");
const usersRouter = require("express").Router();

usersRouter.route("/").get(getUsers);

usersRouter.route("/:username").get(getUserByUsername);

usersRouter.route("*").get(unhandledPath);

module.exports = usersRouter;
