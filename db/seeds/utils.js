const db = require("../connection.js");
const format = require("pg-format");

convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};
propDict = (dataList, propertyKey, propertyValue) => {
  const dataDictionary = {};
  dataList.forEach((data) => {
    dataDictionary[data[propertyKey]] = data[propertyValue];
  });
  return dataDictionary;
};
exports.formatTopicsData = (rawTopicsData) => {
  return rawTopicsData.map((topicData) => {
    return [topicData.slug, topicData.description, topicData.img_url];
  });
};
exports.formatUsersData = (rawUsersData) => {
  return rawUsersData.map((userData) => {
    return [userData.username, userData.name, userData.avatar_url];
  });
};
exports.formatArticlesData = (rawArticlesData) => {
  return rawArticlesData.map((article) => {
    return [
      article.title,
      article.topic,
      article.author,
      article.body,
      convertTimestampToDate(article).created_at,
      article.votes,
      article.article_img_url,
    ];
  });
};
exports.formatCommentsData = (rawCommentsData, articlesData) => {
  const artilcesDictionary = propDict(articlesData, "title", "article_id");
  return rawCommentsData.map((comment) => {
    return [
      artilcesDictionary[comment.article_title],
      comment.body,
      comment.votes,
      comment.author,
      convertTimestampToDate(comment).created_at,
    ];
  });
};
exports.checkExists = (table, column, value) => {
  const queryStr = format("SELECT * FROM %I WHERE %I = $1;", table, column);
  return db.query(queryStr, [value]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Resource not found" });
    }
  });
};

exports.convertTimestampToDate = convertTimestampToDate;
exports.propDict = propDict;
