const db = require("../db/connection.js");

exports.selectTopics = () => {
  return db.query("SELECT * FROM topics");
};

exports.selectTopicById = (topicId) => {
  return db.query("SELECT * FROM topics WHERE topic_id = $1", [topicId]);
};
