exports.handlePsqlErrors = (error, request, response, next) => {
  if (error.code === "22P02") {
    response.status(400).send({ msg: "Bad Request" });
  }
  next(error);
};

exports.handleCustomErrors = (error, request, response, next) => {
  if (error.status) {
    response.status(error.status).send({ msg: error.msg });
  } else {
    next(error);
  }
};

exports.handleServerErrors = (error, request, response, next) => {
  console.log(error, "handle server errors");
  response.status(500).send({ msg: "Internal Server Error" });
};
