const db = require("../db/connection.js");

const selectTopics = () => {
  return db.query("SELECT * FROM topics");
};

const selectTopicById = (topicId) => {
  return db.query("SELECT * FROM topics WHERE topic_id = $1", [topicId]);
};

module.exports = { selectTopics, selectTopicById };
