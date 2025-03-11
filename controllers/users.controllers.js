const { selectUsers } = require("../models/index.models");

exports.getUsers = (request, response, next) => {
  return selectUsers()
    .then(({ rows }) => {
      return response.status(200).send({ users: rows });
    })
    .catch((error) => {
      next(error);
    });
};
