const { selectArticlesById } = require("../models/index.models");

exports.getArticlesById = (request, response, next) => {
  const article_id = request.params.article_id;
  return selectArticlesById(article_id)
    .then(({ rows }) => {
      response.status(200).send({ article: rows[0] });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
};
