const db = require("../db/connection.js");

const selectUsers = () => {
  return db.query("SELECT * FROM users");
};

const selectUserById = (userId) => {
  return db.query("SELECT * FROM users WHERE user_id = $1", [userId]);
};

module.exports = { selectUsers, selectUserById };
