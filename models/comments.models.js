const db = require("../db/connection");
const { checkExists, commentCount } = require("./utils.models");

exports.selectCommentsByArticleId = (article_id) => {
  const promises = [];
  promises.push(checkExists("articles", "article_id", article_id));
  promises.unshift(
    db.query(
      "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC",
      [article_id]
    )
  );
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};
