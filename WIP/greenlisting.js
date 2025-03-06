const express = require("express");
const app = express();

const allowedInputs = ["topics", "users", "articles", "comments"];
let queryStr = `SELECT * FROM table_name`;
let queryValues = [];

if (!allowedInputs.includes(passed_in_value)) {
  return Promise.reject({ status: 404, msg: "Invalid Input" });
}

if (passed_in_value) {
  queryValues.push(passed_in_value);
  queryStr += `WHERE value = $1`;
}

return db.query(`${queryStr} GROUP BY table_name.id`, queryValues);
