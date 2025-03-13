const db = require("../db/connection");

exports.selectTopics = () => {
  return db.query("SELECT slug, description FROM topics");
};

exports.insertTopics = (
  slug,
  description,
  img_url = "https://t3.ftcdn.net/jpg/01/04/40/06/360_F_104400672_zCaPIFbYT1dXdzN85jso7NV8M6uwpKtf.jpg"
) => {
  return db.query(
    "INSERT INTO topics (slug, description, img_url) VALUES ($1,$2,$3) RETURNING *",
    [slug, description, img_url]
  );
};
