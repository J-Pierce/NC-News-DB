const db = require("../connection");
const format = require("pg-format");
const {
  convertTimestampToDate,
  formatTopicsData,
  formatUsersData,
  formatArticlesData,
  formatCommentsData,
} = require("./utils");

const seed = ({ topicData, userData, articleData, commentData }) => {
  return (
    db
      // Drop any pre-existing tables before reseeding
      .query("DROP TABLE IF EXISTS comments")
      .then(() => {
        return db.query("DROP TABLE IF EXISTS articles");
      })
      .then(() => {
        return db.query("DROP TABLE IF EXISTS users");
      })
      .then(() => {
        return db.query("DROP TABLE IF EXISTS topics");
      })
      // Run create tables functions
      .then(() => {
        return createTopics();
      })
      .then(() => {
        return createUsers();
      })
      .then(() => {
        return createArticles();
      })
      .then(() => {
        return createComments();
      })
      // Run insert table data functions
      .then(() => {
        return insertTopicsData(topicData);
      })
      .then(() => {
        return insertUsersData(userData);
      })
      .then(() => {
        return insertArticlesData(articleData);
      })
      .then((insertedArticleData) => {
        return insertCommentsData(commentData, insertedArticleData.rows);
      })
  );
};

// Create tables functions:

function createTopics() {
  return db.query(
    `CREATE TABLE topics (
    slug VARCHAR(40) PRIMARY KEY NOT NULL,
    description VARCHAR(40) NOT NULL,
    img_url VARCHAR(1000) NOT NULL
    );`
  );
}
function createUsers() {
  return db.query(
    `CREATE TABLE users (
    username VARCHAR(40) PRIMARY KEY NOT NULL,
    name VARCHAR(40) NOT NULL,
    avatar_url VARCHAR(1000) NOT NULL
    );`
  );
}
function createArticles() {
  return db.query(
    `CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    topic VARCHAR(40) REFERENCES topics(slug) NOT NULL,
    author VARCHAR(20) REFERENCES users(username) NOT NULL,
    body TEXT NOT NULL,
    created_at TIMESTAMP,
    votes INT DEFAULT 0,
    article_img_url VARCHAR(1000) NOT NULL
    );`
  );
}
function createComments() {
  return db.query(
    `CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    article_id INT REFERENCES articles(article_id) NOT NULL,
    body TEXT NOT NULL,
    votes INT DEFAULT 0,
    author VARCHAR(40) REFERENCES users(username) NOT NULL,
    created_at TIMESTAMP
    );`
  );
}

// Insert table data functions:

function insertTopicsData(rawTopicsData) {
  const formattedTopicsData = formatTopicsData(rawTopicsData);
  return db.query(
    format(
      `INSERT INTO topics
    (slug, description, img_url)
    VALUES
    %L`,
      formattedTopicsData
    )
  );
}
function insertUsersData(rawUsersData) {
  const formattedUsersData = formatUsersData(rawUsersData);
  return db.query(
    format(
      `INSERT INTO users
    (username, name, avatar_url)
    VALUES
    %L`,
      formattedUsersData
    )
  );
}
function insertArticlesData(rawArticlesData) {
  const formattedArticlesData = formatArticlesData(rawArticlesData);
  return db.query(
    format(
      `INSERT INTO articles
    (title, topic, author, body, created_at, votes, article_img_url)
    VALUES
    %L
    RETURNING *`,
      formattedArticlesData
    )
  );
}
function insertCommentsData(rawCommentsData, insertedArticleData) {
  const formattedCommentsData = formatCommentsData(
    rawCommentsData,
    insertedArticleData
  );
  return db.query(
    format(
      `INSERT INTO comments
    (article_id, body, votes, author, created_at)
    VALUES
    %L`,
      formattedCommentsData
    )
  );
}

module.exports = seed;
