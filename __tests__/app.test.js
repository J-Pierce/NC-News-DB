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
describe("\n/api/topics", () => {
  describe("GET:", () => {
    describe("Functionality Tests", () => {
      test("200: When no query given, responds with the topics objects containing all topics with each topic having the correct properties\n", () => {
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
  });
  describe("POST:", () => {
    describe("Functionality Tests", () => {
      test("201: When passed data for a topic, adds that topic to the topics table and returns data added", () => {
        return request(app)
          .post("/api/topics")
          .send({
            slug: "sand",
            description: "I HATE SAND",
            img_url:
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg",
          })
          .expect(201)
          .then(({ body }) => {
            const topic = body.newTopic;
            const { slug, description, img_url } = topic;
            expect(slug).toBe("sand");
            expect(description).toBe("I HATE SAND");
            expect(img_url).toBe(
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg"
            );
          });
      });
      test("201: When unnecessary/extra properties are included, they are ignored from posting", () => {
        return request(app)
          .post("/api/topics")
          .send({
            slug: "sand",
            description: "I HATE SAND",
            img_url:
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg",
            time: "now",
            votes: 10,
          })
          .expect(201)
          .then(({ body }) => {
            const topic = body.newTopic;
            const { slug, description, img_url, time, votes } = topic;
            expect(slug).toBe("sand");
            expect(description).toBe("I HATE SAND");
            expect(img_url).toBe(
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg"
            );
            expect(votes).toBe(undefined);
            expect(time).toBe(undefined);
          });
      });
    });
    describe("Error Tests", () => {
      test("400: When not given a slug or description returns 'Bad Request'", () => {
        return request(app)
          .post("/api/topics")
          .send({
            slug: "sand",
            img_url:
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg",
          })
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
    });
  });
});
describe("\nGET: /api/users", () => {
  test("200: When no query given, responds with the users objects containing all users with each user having the correct properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const users = body.users;
        expect(users.length).toBe(4);
        users.forEach((user) => {
          const { username, name, avatar_url } = user;
          expect(typeof username).toBe("string");
          expect(typeof name).toBe("string");
          expect(typeof avatar_url).toBe("string");
        });
      });
  });
});
describe("\nGET: /api/users/:username\n", () => {
  describe("GET:", () => {
    describe("Functionality Tests", () => {
      test("200: When given a username, responds with the user with that username", () => {
        return request(app)
          .get("/api/users/rogersop")
          .expect(200)
          .then(({ body }) => {
            const user = body.user;
            const { username, name, avatar_url } = user;
            expect(username).toBe("rogersop");
            expect(name).toBe("paul");
            expect(avatar_url).toBe(
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4"
            );
          });
      });
    });
    describe("Error Tests", () => {
      test("404: When given a username that is not in the users table, returns 'Resource Not Found'", () => {
        return request(app)
          .get("/api/users/nonsense")
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
    });
  });
});
describe("\n/api/articles\n", () => {
  describe("GET:", () => {
    describe("Functionality Tests", () => {
      test("200: When no query given, responds with the aricles objects containing all articles with each article having the correct properties", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            expect(articles.length).toBe(10);
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
              expect(typeof comment_count).toBe("string");
            });
          });
      });
      test("Returned array default sorts by date in descending order", () => {
        return request(app)
          .get("/api/articles")
          .then(({ body }) => {
            const articles = body.articles;
            expect(articles).toBeSorted({
              key: "created_at",
              descending: true,
            });
          });
      });
      test("Returned array default article limit 10", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            expect(articles.length).toBe(10);
          });
      });
      test("200: When sort_by and order queries given, responds with the aricles objects containing all articles listed in the specified sort in the specified order", () => {
        return request(app)
          .get("/api/articles?sort_by=title&&order=ASC")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            expect(articles).toBeSorted({ key: "title" });
          });
      });
      test("200: When topic query given, responds with the aricles objects containing all articles with the specified topic value", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            expect(articles.length).toBe(10);
            articles.forEach((article) => {
              expect(article.topic).toBe("mitch");
            });
          });
      });
      test("200: When topic query given, responds with empty array if the specified topic exists but no articles reference it", () => {
        return request(app)
          .get("/api/articles?topic=paper")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            expect(articles.length).toBe(0);
          });
      });
      test("200: When limit query given, responds with articles array containing as many articles as limit provided", () => {
        return request(app)
          .get("/api/articles?limit=5")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            expect(articles.length).toBe(5);
          });
      });
      test("200: When p query given, responds with articles array containing articles in: [ p*limit , (p+1)*limit )", () => {
        return request(app)
          .get("/api/articles?sort_by=article_id&&order=ASC&&limit=3&&p=2")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            expect(articles.length).toBe(3);
            articles.forEach((article) => {
              expect([7, 8, 9].includes(article.article_id)).toBe(true);
            });
          });
      });
      test("200: When p query given is past than all articles, responds with an empty array", () => {
        return request(app)
          .get("/api/articles?sort_by=article_id&&order=ASC&&limit=3&&p=20")
          .expect(200)
          .then(({ body }) => {
            const articles = body.articles;
            expect(articles.length).toBe(0);
          });
      });
    });
    describe("Error Tests", () => {
      test("400: When queried with an invalid query, returns 'Bad Request'", () => {
        return request(app)
          .get("/api/articles?nonsense=nonsense")
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
      test("400: When sort queried with an invalid column name, returns 'Bad Request'", () => {
        return request(app)
          .get("/api/articles?sort_by=nonsense")
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
      test("400: When order queried with an invalid direction, returns 'Bad Request'", () => {
        return request(app)
          .get("/api/articles?order=nonsense")
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
      test("404: When topic queried with non-existing topic, returns 'Resource Not Found'\n", () => {
        return request(app)
          .get("/api/articles?topic=nonsense")
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
      test("400: When limit queried with an invalid amount, returns 'Bad Request'", () => {
        return request(app)
          .get("/api/articles?limit=nonsense")
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
      test("400: When p queried with an invalid amount, returns 'Bad Request'", () => {
        return request(app)
          .get("/api/articles?p=nonsense")
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
      test("201: When passed data for an article, adds that article to the articles table and returns data added", () => {
        return request(app)
          .post("/api/articles")
          .send({
            author: "lurker",
            title: "Stationary",
            body: "I like paper!",
            topic: "paper",
            article_img_url:
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg",
          })
          .expect(201)
          .then((data) => {
            const article = data.body.newArticle;
            const {
              author,
              title,
              body,
              topic,
              article_img_url,
              article_id,
              votes,
              created_at,
              comment_count,
            } = article;
            expect(author).toBe("lurker");
            expect(title).toBe("Stationary");
            expect(body).toBe("I like paper!");
            expect(topic).toBe("paper");
            expect(article_img_url).toBe(
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg"
            );
            expect(article_id).toBe(14);
            expect(votes).toBe(0);
            expect(typeof created_at).toBe("string");
            expect(comment_count).toBe(0);
          });
      });
      test("201: When unnecessary/extra properties are included, they are ignored from posting", () => {
        return request(app)
          .post("/api/articles")
          .send({
            author: "lurker",
            title: "Stationary",
            body: "I like paper!",
            topic: "paper",
            article_img_url:
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg",
            time: "now",
          })
          .expect(201)
          .then((data) => {
            const article = data.body.newArticle;

            const {
              author,
              title,
              body,
              topic,
              article_img_url,
              article_id,
              votes,
              created_at,
              comment_count,
              time,
            } = article;
            expect(author).toBe("lurker");
            expect(title).toBe("Stationary");
            expect(body).toBe("I like paper!");
            expect(topic).toBe("paper");
            expect(article_img_url).toBe(
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg"
            );
            expect(article_id).toBe(14);
            expect(votes).toBe(0);
            expect(typeof created_at).toBe("string");
            expect(comment_count).toBe(0);
            expect(time).toBe(undefined);
          });
      });
    });
    describe("Error Tests", () => {
      test("404: When given a topic that is not in the topics table, returns 'Resource Not Found'", () => {
        return request(app)
          .post("/api/articles")
          .send({
            author: "lurker",
            title: "Stationary",
            body: "I like paper!",
            topic: "glue",
            article_img_url:
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg",
          })
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
      test("404: When given an author that is not in the users table, returns 'Resource Not Found'", () => {
        return request(app)
          .post("/api/articles")
          .send({
            author: "james",
            title: "Stationary",
            body: "I like paper!",
            topic: "paper",
            article_img_url:
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg",
          })
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
      test("400: When given an author that is of an incorrect data type, returns 'Bad Request'", () => {
        return request(app)
          .post("/api/articles/nonsense/comments")
          .send({
            author: 10,
            title: "Stationary",
            body: "I like paper!",
            topic: "paper",
            article_img_url:
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg",
          })
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
      test("400: When not given author, title, body, or topic, returns 'Bad Request'", () => {
        return request(app)
          .post("/api/articles")
          .send({
            author: "lurker",
            body: "I like paper!",
            topic: "paper",
            article_img_url:
              "https://res.cloudinary.com/env-imgs/images/f_auto/shopimages/products/1200/white-card/.jpg",
          })
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
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
              comment_count,
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
            expect(comment_count).toBe("2");
          });
      });
    });
    describe("Error Tests", () => {
      test("404: When given an article id that is not in the articles table, returns 'Resource Not Found'", () => {
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
      test("404: When given an article id that is not in the articles table, returns 'Resource Not Found'", () => {
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
      test("200: When limit query given, responds with comments array containing as many comments as limit provided", () => {
        return request(app)
          .get("/api/articles/1/comments?limit=5")
          .expect(200)
          .then(({ body }) => {
            const comments = body.comments;
            expect(comments.length).toBe(5);
          });
      });
      test("200: When p query given, responds with comments array containing comments in: [ p*limit , (p+1)*limSit )", () => {
        return request(app)
          .get("/api/articles/1/comments?limit=2&&p=2")
          .expect(200)
          .then(({ body }) => {
            const comments = body.comments;
            expect(comments.length).toBe(2);
          });
      });
      test("200: When p query given is past than all comments, responds with an empty array", () => {
        return request(app)
          .get("/api/articles/1/comments?limit=2&&p=100")
          .expect(200)
          .then(({ body }) => {
            const comments = body.comments;
            expect(comments.length).toBe(0);
          });
      });
    });
    describe("Error Tests", () => {
      test("404: When given an article id that is not in the articles table, returns 'Resource Not Found'", () => {
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
      test("404: When not given username or body, returns ''Resource Not Found'", () => {
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
  describe("PATCH:", () => {
    describe("Functionality Tests", () => {
      test("200: When given a comment_id and a positive votes to add, increases that comments votes and returns the updated comment", () => {
        return request(app)
          .patch("/api/comments/4")
          .send({
            inc_votes: 50,
          })
          .expect(200)
          .then((data) => {
            const comment = data.body.updatedComment;
            const { comment_id, article_id, body, votes, author, created_at } =
              comment;
            expect(comment_id).toBe(4);
            expect(article_id).toBe(1);
            expect(body).toBe(
              " I carry a log — yes. Is it funny to you? It is not to me."
            );
            expect(votes).toBe(-50);
            expect(author).toBe("icellusedkars");
            expect(created_at).toBe("2020-02-23T12:01:00.000Z");
          });
      });
      test("200: When given a comment_id and a negative votes to add, decreases that comments votes and returns the updated comment", () => {
        return request(app)
          .patch("/api/comments/4")
          .send({
            inc_votes: -50,
          })
          .expect(200)
          .then((data) => {
            const comment = data.body.updatedComment;
            const { comment_id, article_id, body, votes, author, created_at } =
              comment;
            expect(comment_id).toBe(4);
            expect(article_id).toBe(1);
            expect(body).toBe(
              " I carry a log — yes. Is it funny to you? It is not to me."
            );
            expect(votes).toBe(-150);
            expect(author).toBe("icellusedkars");
            expect(created_at).toBe("2020-02-23T12:01:00.000Z");
          });
      });
      test("200: When unnecessary/extra properties are included, they are ignored from updating", () => {
        return request(app)
          .patch("/api/comments/4")
          .send({
            inc_votes: 50,
            opinion: "good",
            hello: "goodbye",
          })
          .expect(200)
          .then((data) => {
            const comment = data.body.updatedComment;
            const { comment_id, article_id, body, votes, author, created_at } =
              comment;
            expect(comment_id).toBe(4);
            expect(article_id).toBe(1);
            expect(body).toBe(
              " I carry a log — yes. Is it funny to you? It is not to me."
            );
            expect(votes).toBe(-50);
            expect(author).toBe("icellusedkars");
            expect(created_at).toBe("2020-02-23T12:01:00.000Z");
          });
      });
    });
    describe("Error Tests", () => {
      test("404: When given a comment_id that is not in the comments table, returns 'Resource Not Found'", () => {
        return request(app)
          .patch("/api/comments/9999")
          .send({
            inc_votes: 50,
          })
          .expect(404)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Resource Not Found");
          });
      });
      test("400: When given a comment_id that is of an incorrect data type, returns 'Bad Request'", () => {
        return request(app)
          .patch("/api/comments/nonsense")
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
          .patch("/api/comments/4")
          .send({
            inc_votes: "nonsense",
          })
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
      test("400: When not given inc_votes, returns 'Bad Request'\n", () => {
        return request(app)
          .patch("/api/comments/4")
          .send({})
          .expect(400)
          .then(({ body }) => {
            const msg = body.msg;
            expect(msg).toBe("Bad Request");
          });
      });
    });
  });
  describe("DELETE:", () => {
    describe("Functionality Tests", () => {
      test("204: When given a comment id, removes that comment from the comments table", () => {
        return request(app).delete("/api/comments/3").expect(204);
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
