const db = require("../../db/connection");
const comments = require("../data/test-data/comments");

convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

function propDict(dataList, propertyKey, propertyValue) {
  const dataDictionary = {};
  for (const data of dataList) {
    dataDictionary[data[propertyKey]] = data[propertyValue];
  }
  return dataDictionary;
}

function formatTopicsData(rawTopicsData) {
  const formattedTopicsData = [];
  for (const topicData of rawTopicsData) {
    formattedTopicsData.push([
      topicData.slug,
      topicData.description,
      topicData.img_url,
    ]);
  }
  return formattedTopicsData;
}

function formatUsersData(rawUsersData) {
  const formattedUsersData = [];
  for (const userData of rawUsersData) {
    formattedUsersData.push([
      userData.username,
      userData.name,
      userData.avatar_url,
    ]);
  }
  return formattedUsersData;
}

function formatArticlesData(rawArticlesData) {
  const formattedArticlesData = [];
  rawArticlesData.map((article) => {
    formattedArticlesData.push([
      article.title,
      article.topic,
      article.author,
      article.body,
      convertTimestampToDate(article).created_at,
      article.votes,
      article.article_img_url,
    ]);
  });
  return formattedArticlesData;
}

function formatCommentsData(rawCommentsData, articlesData) {
  const formattedCommentsData = [];
  artilcesDictionary = propDict(articlesData, "title", "article_id");
  rawCommentsData.map((comment) => {
    formattedCommentsData.push([
      artilcesDictionary[comment.article_title],
      comment.body,
      comment.votes,
      comment.author,
      convertTimestampToDate(comment).created_at,
    ]);
  });
  return formattedCommentsData;
}
exports.convertTimestampToDate = convertTimestampToDate;
exports.formatTopicsData = formatTopicsData;
exports.formatUsersData = formatUsersData;
exports.formatArticlesData = formatArticlesData;
exports.formatCommentsData = formatCommentsData;
