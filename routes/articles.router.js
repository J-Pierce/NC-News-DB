const {
  getArticles,
  postArticle,
  getArticleById,
  patchArticleById,
  removeArticleById,
  getCommentsByArticleId,
  postCommentsByArticleId,
  unhandledPath,
} = require("../controllers/index.controllers");
const articlesRouter = require("express").Router();

articlesRouter.route("/").get(getArticles).post(postArticle);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(removeArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentsByArticleId);

articlesRouter.route("*").get(unhandledPath);

module.exports = articlesRouter;
