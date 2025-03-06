const db = require("../db/connection.js");

exports.selectComments = () => {
  return db.query("SELECT * FROM comments");
};

exports.selectCommentById = (commentId) => {
  return db.query("SELECT * FROM comments WHERE comment_id = $1", [commentId]);
};
