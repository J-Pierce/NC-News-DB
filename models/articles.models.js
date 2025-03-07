const db = require("../db/connection.js");
const format = require("pg-format");
const { checkExists } = require("./utils.js");

exports.selectArticles = (queries) => {
  const promises = [];
  const whiteListQueryType = ["author", "topic", "sort", "order"];
  const whiteListSort = ["created_at", "votes", "title", "author"];
  const whiteListOrder = ["ASC", "DESC"];
  let { author, topic, sort, order } = queries;

  // Set default values
  sort = sort ?? "created_at";
  order = order ?? "ASC";
  order === "desc"
    ? (order = "DESC")
    : order === "asc"
    ? (order = "ASC")
    : (order = order);

  // check queries are valid
  for (const query in queries) {
    if (!whiteListQueryType.includes(query))
      return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  if (!whiteListSort.includes(sort) || !whiteListOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }

  // Default string
  let queryStr = "SELECT * FROM articles";
  const queryValues = [];

  // Augment by WHERE queries
  if (author) {
    promises.push(checkExists("articles", "author", author));
    queryStr += " WHERE author = $1";
    queryValues.push(author);
  } else if (topic) {
    promises.push(checkExists("articles", "topic", topic));
    queryStr += " WHERE topic = $1";
    queryValues.push(topic);
  }

  // Augment by ORDER BY queries
  queryStr += format(" ORDER BY %I ", sort) + order;

  // Return query
  promises.unshift(db.query(queryStr, queryValues));
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};

exports.selectArticleById = (articleId) => {
  return db.query("SELECT * FROM articles WHERE article_id = $1", [articleId]);
};
