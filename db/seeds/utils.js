convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};
function propDict(dataList, propertyKey, propertyValue) {
  const dataDictionary = {};
  dataList.forEach((data) => {
    dataDictionary[data[propertyKey]] = data[propertyValue];
  });
  return dataDictionary;
}

// Format Data Utils
function formatTopicsData(rawTopicsData) {
  return rawTopicsData.map((topicData) => {
    return [topicData.slug, topicData.description, topicData.img_url];
  });
}
function formatUsersData(rawUsersData) {
  return rawUsersData.map((userData) => {
    return [userData.username, userData.name, userData.avatar_url];
  });
}
function formatArticlesData(rawArticlesData) {
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
}
function formatCommentsData(rawCommentsData, articlesData) {
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
}

exports.convertTimestampToDate = convertTimestampToDate;
exports.formatTopicsData = formatTopicsData;
exports.formatUsersData = formatUsersData;
exports.formatArticlesData = formatArticlesData;
exports.formatCommentsData = formatCommentsData;
