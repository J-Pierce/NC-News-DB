const db = require("../db/connection");
const { checkExists } = require("./utils.models");

exports.selectUsers = () => {
  return db.query("SELECT * FROM users");
};

exports.selectUserByUsername = (username) => {
  const promises = [];
  promises.push(checkExists("users", "username", username));
  promises.unshift(
    db.query("SELECT * FROM users WHERE username = $1", [username])
  );
  return Promise.all(promises).then((data) => {
    return data[0];
  });
};
