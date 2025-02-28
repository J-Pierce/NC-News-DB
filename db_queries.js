const db = require("./db/connection");

db.query("Select username, name FROM users")
  .then((data) => {
    console.log("All users: ");
    console.log(data.rows);
  })
  .then(() => {
    return db.query("Select body FROM articles WHERE topic = 'coding'");
  })
  .then((data) => {
    console.log("All articles where the topic is coding: ");
    console.log(data.rows);
  })
  .then(() => {
    return db.query("Select body FROM comments WHERE votes < 0");
  })
  .then((data) => {
    console.log("\n\n\nAll comments where the votes are less than 0: ");
    console.log(data.rows);
  })
  .then(() => {
    return db.query("Select slug FROM topics");
  })
  .then((data) => {
    console.log("\n\n\nAll topics: ");
    console.log(data.rows);
  })
  .then(() => {
    return db.query(
      "Select * FROM articles WHERE articles.author = 'grumpy19'"
    );
  })
  .then((data) => {
    console.log("\n\n\nAll articles by user grumpy19: ");
    console.log(data.rows);
  })
  .then(() => {
    return db.query("Select * FROM comments WHERE comments.votes > 10");
  })
  .then((data) => {
    console.log("\n\n\nAll comments that have more than 10 votes: ");
    console.log(data.rows);
  });
