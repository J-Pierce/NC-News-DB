const {
  getArticles,
  getArticlesById,
  patchArticleById,
  getCommentsByArticleId,
  postCommentsByArticleId,
  unhandledPath,
} = require("../controllers/index.controllers");
const articlesRouter = require("express").Router();

articlesRouter.route("/").get(getArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticlesById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentsByArticleId);

articlesRouter.route("*").get(unhandledPath);

module.exports = articlesRouter;
