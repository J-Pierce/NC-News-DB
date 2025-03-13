const {
  getComments,
  patchCommentById,
  removeCommentById,
  unhandledPath,
} = require("../controllers/index.controllers");

const commentsRouter = require("express").Router();

commentsRouter.route("/").get(getComments);

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(removeCommentById);

commentsRouter.route("*").get(unhandledPath);

module.exports = commentsRouter;
