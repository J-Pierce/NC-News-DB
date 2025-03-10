const db = require("../db/connection");
const { checkExists, commentCount } = require("./utils.models");

exports.selectArticles = async () => {
  const { rows } = await db.query(
    "SELECT author, title, article_id, topic, created_at, votes, article_img_url FROM articles ORDER By created_at DESC"
  );
  const countDict = await commentCount();
  rows.map((article) => {
    const id = article.article_id;
    if (countDict[id]) {
      article.comment_count = countDict[id];
    } else {
      article.comment_count = 0;
    }
    return article;
  });
  return rows;
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
