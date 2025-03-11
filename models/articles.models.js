const db = require("../db/connection");
const format = require("pg-format");
const { checkExists } = require("./utils.models");

exports.selectArticles = (sort = "created_at", order = "DESC", topic, rest) => {
  const whiteListSort = [
    "title",
    "topic",
    "author",
    "created_at",
    "votes",
    "article_img_url",
    "comment_count",
  ];
  const whiteListOrder = ["ASC", "DESC"];
  const promises = [];

  // check sort queries are valid
  if (
    !whiteListSort.includes(sort) ||
    !whiteListOrder.includes(order) ||
    Object.keys(rest).length > 0
  ) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  // Default string
  let queryStr =
    "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles FULL OUTER JOIN comments ON articles.article_id = comments.article_id";
  const queryValues = [];

  // Augment by WHERE queries
  if (topic) {
    promises.push(checkExists("articles", "topic", topic));
    queryStr += " WHERE articles.topic = $1";
    queryValues.push(topic);
  }

  // Add Group BY
  queryStr += " GROUP BY articles.article_id";

  // Augment by ORDER BY queries
  queryStr += format(" ORDER BY %I ", sort) + order;

  // Return query
  promises.unshift(db.query(queryStr, queryValues));
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};

exports.selectArticlesById = (article_id) => {
  const promises = [];
  promises.push(checkExists("articles", "article_id", article_id));
  promises.unshift(
    db.query("SELECT * FROM articles WHERE article_id = $1", [article_id])
  );
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};

exports.updateArticlesById = (article_id, inc_votes) => {
  if (!(typeof inc_votes === "number")) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  const promises = [];
  promises.push(checkExists("articles", "article_id", article_id));
  promises.unshift(
    db.query(
      "UPDATE articles SET votes = votes + $2 WHERE article_id = $1 RETURNING *",
      [article_id, inc_votes]
    )
  );
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};
