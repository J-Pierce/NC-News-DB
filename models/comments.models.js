const db = require("../db/connection.js");

const selectComments = () => {
  return db.query("SELECT * FROM comments");
};

const selectCommentById = (commentId) => {
  return db.query("SELECT * FROM comments WHERE comment_id = $1", [commentId]);
};

module.exports = { selectComments, selectCommentById };
