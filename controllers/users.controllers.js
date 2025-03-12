const { selectUsers, selectUserByUsername } = require("../models/index.models");

exports.getUsers = (request, response, next) => {
  return selectUsers()
    .then(({ rows }) => {
      return response.status(200).send({ users: rows });
    })
    .catch((error) => {
      next(error);
    });
};

exports.getUserByUsername = (request, response, next) => {
  const { username } = request.params;
  return selectUserByUsername(username)
    .then(({ rows }) => {
      response.status(200).send({ user: rows[0] });
    })
    .catch((error) => {
      next(error);
    });
};
