const db = require("../db/connection");
const { checkExists } = require("./utils.models");

exports.selectCommentsByArticleId = (article_id, limit = 10, p = 0, rest) => {
  const promises = [];

  // check sort queries are valid
  if (Object.keys(rest).length > 0) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  promises.push(checkExists("articles", "article_id", article_id));

  // Default string
  const queryValues = [];
  let queryStr =
    "SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC";
  queryValues.push(article_id);

  // Augment by LIMIT queries
  queryStr += " LIMIT $2 OFFSET $3";
  queryValues.push(limit);
  queryValues.push(p * limit);

  promises.unshift(db.query(queryStr, queryValues));
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
exports.updateCommentById = (comment_id, inc_votes) => {
  if (!(typeof inc_votes === "number")) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  const promises = [];
  promises.push(checkExists("comments", "comment_id", comment_id));
  promises.unshift(
    db.query(
      "UPDATE comments SET votes = votes + $2 WHERE comment_id = $1 RETURNING *",
      [comment_id, inc_votes]
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
