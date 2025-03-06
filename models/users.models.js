const db = require("../db/connection.js");

exports.selectUsers = () => {
  return db.query("SELECT * FROM users");
};

exports.selectUserById = (userId) => {
  return db.query("SELECT * FROM users WHERE user_id = $1", [userId]);
};
