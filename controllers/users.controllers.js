const { selectUsers, selectUserById } = require("../models/index.models");

exports.getUsers = (request, response) => {
  selectUsers().then(({ rows }) => {
    response.status(200).send({ users: rows });
  });
};

exports.getUserById = (request, response) => {
  const { usersId } = request.params;
  selectUserById(usersId).then(({ rows }) => {
    response.status(200).send({ user: rows[0] });
  });
};
