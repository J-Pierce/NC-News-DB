const endpointsJson = require("../endpoints.json");

const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

const request = require("supertest");
const app = require("../app.js");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("\nInvalid Path", () => {
  test("404: When given an invalid path, returns 'Resource Not Found'", () => {
    return request(app)
      .get("/api/nonsense")
      .expect(404)
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toBe("Resource Not Found");
      });
  });
});
describe("\nGET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});
describe("\nGET: /api/topics", () => {
  test("200: When no query given, responds with the topics objects containing all topics with each topic having the correct properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const topics = body.topics;
        expect(topics.length).toBe(3);
        topics.forEach((topic) => {
          const { slug, description } = topic;
          expect(typeof slug).toBe("string");
          expect(typeof description).toBe("string");
        });
      });
  });
});
describe("\nGET: /api/articles", () => {
  test("200: When no query given, responds with the aricles objects containing all articles with each article having the correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles.length).toBe(13);
        articles.forEach((article) => {
          const {
            author,
            title,
            article_id,
            topic,
            created_at,
            votes,
            article_img_url,
            comment_count,
          } = article;
          expect(typeof author).toBe("string");
          expect(typeof title).toBe("string");
          expect(typeof article_id).toBe("number");
          expect(typeof topic).toBe("string");
          expect(typeof created_at).toBe("string");
          expect(typeof votes).toBe("number");
          expect(typeof article_img_url).toBe("string");
          expect(typeof comment_count).toBe("number");
        });
      });
  });
  test("Returned array default sorts by date in descending order", () => {
    return request(app)
      .get("/api/articles")
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles).toBeSorted({ key: "created_at", descending: true });
      });
  });
});
describe("\n/api/articles/:article_id:\n", () => {
  describe("GET:", () => {
    describe("Functionality Tests", () => {
      test("200: When given an article id, responds with the article with that article id", () => {
        return request(app)
          .get("/api/articles/3")
          .expect(200)
          .then((data) => {
            const article = data.body.article;
            const {
              author,
              title,
              article_id,
              body,
              topic,
              created_at,
              votes,
              article_img_url,
            } = article;
            expect(author).toBe("icellusedkars");
            expect(title).toBe("Eight pug gifs that remind me of mitch");
            expect(article_id).toBe(3);
            expect(body).toBe("some gifs");
            expect(topic).toBe("mitch");
            expect(created_at).toBe("2020-11-03T09:12:00.000Z");
            expect(votes).toBe(0);
            expect(article_img_url).toBe(
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
            );
          });
      });
    });
    describe("Error Tests", () => {
      test("404: When given an article id that is not in the articles table, returns 'Not Found'", () => {
        return request(app)
          .get("/api/articles/99999")
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
      test("400: When given an article id that is of an incorrect data type, returns 'Bad Request'\n", () => {
        return request(app)
          .get("/api/articles/nonsense")
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
    });
  });
  describe("PATCH:", () => {
    describe("Functionality Tests", () => {
      test("200: When given an article id and a positive votes to add, increases that articles votes and returns the updated article", () => {
        return request(app)
          .patch("/api/articles/4")
          .send({
            inc_votes: 50,
          })
          .expect(200)
          .then((data) => {
            const article = data.body.updatedArticle;
            const {
              article_id,
              title,
              topic,
              author,
              body,
              created_at,
              votes,
              article_img_url,
            } = article;
            expect(article_id).toBe(4);
            expect(title).toBe("Student SUES Mitch!"),
              expect(topic).toBe("mitch"),
              expect(author).toBe("rogersop"),
              expect(body).toBe(
                "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages"
              ),
              expect(created_at).toBe("2020-05-06T01:14:00.000Z"),
              expect(votes).toBe(50),
              expect(article_img_url).toBe(
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
              );
          });
      });
      test("200: When given an article id and a negative votes to add, decreases that articles votes and returns the updated article", () => {
        return request(app)
          .patch("/api/articles/4")
          .send({
            inc_votes: -12,
          })
          .expect(200)
          .then((data) => {
            const article = data.body.updatedArticle;
            const {
              article_id,
              title,
              topic,
              author,
              body,
              created_at,
              votes,
              article_img_url,
            } = article;
            expect(article_id).toBe(4);
            expect(title).toBe("Student SUES Mitch!"),
              expect(topic).toBe("mitch"),
              expect(author).toBe("rogersop"),
              expect(body).toBe(
                "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages"
              ),
              expect(created_at).toBe("2020-05-06T01:14:00.000Z"),
              expect(votes).toBe(-12),
              expect(article_img_url).toBe(
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
              );
          });
      });
      test("200: When unnecessary/extra properties are included, they are ignored from updating", () => {
        return request(app)
          .patch("/api/articles/4")
          .send({
            inc_votes: 50,
            opinion: "good",
            price: 20,
          })
          .expect(200)
          .then((data) => {
            const article = data.body.updatedArticle;
            const {
              article_id,
              title,
              topic,
              author,
              body,
              created_at,
              votes,
              article_img_url,
              opinion,
              price,
            } = article;
            expect(article_id).toBe(4);
            expect(title).toBe("Student SUES Mitch!"),
              expect(topic).toBe("mitch"),
              expect(author).toBe("rogersop"),
              expect(body).toBe(
                "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages"
              ),
              expect(created_at).toBe("2020-05-06T01:14:00.000Z"),
              expect(votes).toBe(50),
              expect(article_img_url).toBe(
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
              );
            expect(opinion).toBe(undefined);
            expect(price).toBe(undefined);
          });
      });
    });
    describe("Error Tests", () => {
      test("404: When given an article id that is not in the articles table, returns 'Not Found'", () => {
        return request(app)
          .patch("/api/articles/9999")
          .send({
            inc_votes: 50,
          })
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
      test("400: When given an article id that is of an incorrect data type, returns 'Bad Request'", () => {
        return request(app)
          .patch("/api/articles/nonsense")
          .send({
            inc_votes: 50,
          })
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
      test("400: When given inc_votes that is of an incorrect data type, returns 'Bad Request'", () => {
        return request(app)
          .patch("/api/articles/4")
          .send({
            inc_votes: "nonsense",
          })
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
      test("400: When not given inc_votes, returns 'Bad Request'", () => {
        return request(app)
          .patch("/api/articles/4")
          .send({})
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
    });
  });
});
describe("\n/api/articles/:article_id/comments:\n", () => {
  describe("GET:", () => {
    describe("Functionality Tests", () => {
      test("200: When given an article id, responds with the comments with that article id", () => {
        return request(app)
          .get("/api/articles/3/comments")
          .expect(200)
          .then((data) => {
            //console.log(data.body.comments);
            const comments = data.body.comments;

            expect(comments.length).toBe(2);
            comments.forEach((comment) => {
              const {
                comment_id,
                votes,
                created_at,
                author,
                body,
                article_id,
              } = comment;
              expect(typeof comment_id).toBe("number");
              expect(typeof votes).toBe("number");
              expect(typeof created_at).toBe("string");
              expect(typeof author).toBe("string");
              expect(typeof body).toBe("string");
              expect(article_id).toBe(3);
            });
          });
      });
      test("Returned array is default sorted by the most recent comment first", () => {
        return request(app)
          .get("/api/articles/3/comments")
          .expect(200)
          .then((data) => {
            const comments = data.body.comments;
            expect(comments).toBeSorted({
              key: "created_at",
              descending: true,
            });
          });
      });
      test("200: When given an article id that doesn't have any associated comments, returns an empty array", () => {
        return request(app)
          .get("/api/articles/4/comments")
          .expect(200)
          .then((data) => {
            const comments = data.body.comments;
            expect(comments.length).toBe(0);
          });
      });
    });
    describe("Error Tests", () => {
      test("404: When given an article id that is not in the articles table, returns 'Not Found'", () => {
        return request(app)
          .get("/api/articles/99999/comments")
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
      test("400: When given an article id that is of an incorrect data type, returns 'Bad Request'\n", () => {
        return request(app)
          .get("/api/articles/nonsense/comments")
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
    });
  });
  describe("POST:", () => {
    describe("Functionality Tests", () => {
      test("201: When passed data for a comment, adds that comment to the comments table and returns data added", () => {
        return request(app)
          .post("/api/articles/4/comments")
          .send({
            username: "butter_bridge",
            body: "sometimes code is confusing",
          })
          .expect(201)
          .then((data) => {
            const comment = data.body.newComment;
            const { comment_id, votes, created_at, author, body, article_id } =
              comment;
            expect(comment_id).toBe(19);
            expect(votes).toBe(0);
            expect(typeof created_at).toBe("string");
            expect(author).toBe("butter_bridge");
            expect(body).toBe("sometimes code is confusing");
            expect(article_id).toBe(4);
          });
      });
      test("201: When unnecessary/extra properties are included, they are ignored from posting", () => {
        return request(app)
          .post("/api/articles/4/comments")
          .send({
            username: "butter_bridge",
            body: "sometimes code is confusing",
            opinion: "good",
            price: 23,
          })
          .expect(201)
          .then((data) => {
            const comment = data.body.newComment;
            const {
              comment_id,
              votes,
              created_at,
              author,
              body,
              article_id,
              opinion,
              price,
            } = comment;
            expect(comment_id).toBe(19);
            expect(votes).toBe(0);
            expect(typeof created_at).toBe("string");
            expect(author).toBe("butter_bridge");
            expect(body).toBe("sometimes code is confusing");
            expect(article_id).toBe(4);
            expect(opinion).toBe(undefined);
            expect(price).toBe(undefined);
          });
      });
    });
    describe("Error Tests", () => {
      test("404: When given an article id that is not in the articles table, returns 'Resource Not Found'", () => {
        return request(app)
          .post("/api/articles/9999/comments")
          .send({
            username: "butter_bridge",
            body: "sometimes code is confusing",
          })
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
      test("400: When given an article id that is of an incorrect data type, returns 'Bad Request'", () => {
        return request(app)
          .post("/api/articles/nonsense/comments")
          .send({
            username: "butter_bridge",
            body: "sometimes code is confusing",
          })
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
      test("404: When given a username that is not in the users table, returns 'Resource Not Found'", () => {
        return request(app)
          .post("/api/articles/4/comments")
          .send({
            username: "james",
            body: "sometimes code is confusing",
          })
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
      test("400: When not given username or body, returns 'Bad Request'", () => {
        return request(app)
          .post("/api/articles/4/comments")
          .send({
            body: "sometimes code is confusing",
          })
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
    });
  });
});
describe("\n/api/comments/:comment_id:\n", () => {
  describe("DELETE:", () => {
    describe("Functionality Tests", () => {
      test("204: When given a comment id, removes that comment from the comments table", () => {
        return request(app)
          .delete("/api/comments/3")
          .expect(204)
          .then(({ body }) => {
            console.log(body.deletedComment);
            expect(body).toEqual({});
          });
      });
    });
    describe("Error Tests", () => {
      test("404: When given a comment id that is not in the comments table, returns 'Resource Not Found'", () => {
        return request(app)
          .delete("/api/comments/99999")
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
      test("400: When given a comment id that is of an incorrect data type, returns 'Bad Request'", () => {
        return request(app)
          .delete("/api/comments/nonsense")
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
    });
  });
});
