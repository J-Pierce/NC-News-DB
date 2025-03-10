const db = require("../db/connection");
const { checkExists } = require("./utils.models");

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
