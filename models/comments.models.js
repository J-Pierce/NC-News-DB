const db = require("../db/connection");
const { checkExists } = require("./utils.models");

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
exports.insertCommentsByArticleId = (article_id, username, body) => {
  const votes = 0;
  const created_at = new Date(Date.now());

  const promises = [];
  promises.push(checkExists("articles", "article_id", article_id));
  promises.push(checkExists("users", "username", username));

  promises.unshift(
    db.query(
      "INSERT INTO comments (article_id, body, votes, author, created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *",
      [article_id, body, votes, username, created_at]
    )
  );
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};
exports.deleteCommentById = (comment_id) => {
  const promises = [];
  promises.push(checkExists("comments", "comment_id", comment_id));
  promises.unshift(
    db.query("DELETE FROM comments WHERE comment_id = $1", [comment_id])
  );
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};
