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
    promises.push(checkExists("topics", "slug", topic));
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
exports.insertArticle = (
  author,
  title,
  body,
  topic,
  article_img_url = "https://t3.ftcdn.net/jpg/01/04/40/06/360_F_104400672_zCaPIFbYT1dXdzN85jso7NV8M6uwpKtf.jpg"
) => {
  const votes = 0;
  const created_at = new Date(Date.now());

  const promises = [];
  promises.push(checkExists("topics", "slug", topic));
  promises.push(checkExists("users", "username", author));

  promises.unshift(
    db.query(
      "INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [title, topic, author, body, created_at, votes, article_img_url]
    )
  );
  return Promise.all(promises).then((data) => {
    data[0].rows[0].comment_count = 0;
    return data[0];
  });
};
exports.selectArticleById = (article_id) => {
  const promises = [];
  promises.push(checkExists("articles", "article_id", article_id));
  promises.unshift(
    db.query(
      "SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles FULL OUTER JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = $1 GROUP BY articles.article_id",
      [article_id]
    )
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
