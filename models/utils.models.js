const db = require("../db/connection.js");
const format = require("pg-format");

exports.checkExists = (table, column, value) => {
  const queryStr = format("SELECT * FROM %I WHERE %I = $1;", table, column);
  return db.query(queryStr, [value]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Resource Not Found" });
    }
    return rows;
  });
};

exports.commentCount = () => {
  const countDict = {};
  return db
    .query(
      "SELECT article_id, COUNT(*) AS comment_count FROM comments GROUP BY article_id"
    )
    .then(({ rows }) => {
      rows.forEach((row) => {
        const key = row.article_id;
        const value = row.comment_count;
        countDict[key] = Number(value);
      });
      return countDict;
    });
};
