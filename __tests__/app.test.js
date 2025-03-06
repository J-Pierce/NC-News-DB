const endpointsJson = require("../endpoints.json");
/* Set up your test imports here */
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");
/* Set up your beforeEach & afterAll functions here */
beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET: /api/topics", () => {
  test("200: responds with the topics objects with each topic having the correct properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const topics = body.topics;
        topics.forEach((topic) => {
          const { slug, description, img_url } = topic;
          expect(typeof slug).toBe("string");
          expect(typeof description).toBe("string");
          expect(typeof img_url).toBe("string");
        });
      });
  });
});

describe("GET: /api/users", () => {
  test("200: responds with the users objects with each user having the correct properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const users = body.users;
        users.forEach((user) => {
          const { username, name, avatar_url } = user;
          expect(typeof username).toBe("string");
          expect(typeof name).toBe("string");
          expect(typeof avatar_url).toBe("string");
        });
      });
  });
});

xdescribe("GET: /api/articles", () => {
  test("200: responds with the articles objects with each article having the correct properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        //console.log(articles);
        articles.forEach((article) => {
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
          expect(typeof article_id).toBe("number");
          expect(typeof title).toBe("string");
          expect(typeof topic).toBe("string");
          expect(typeof author).toBe("string");
          expect(typeof body).toBe("string");
          expect(typeof created_at).toBe("string");
          expect(typeof votes).toBe("number");
          expect(typeof article_img_url).toBe("string");
        });
      });
  });
  test("200: responds with the articles objects with each article having the correct properties", () => {
    return request(app)
      .get("/api/articles?author=rogersop")
      .expect(200)
      .then(({ body }) => {
        console.log("author test: ", body);
      });
  });
  test("200: by topic", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body }) => {
        console.log("topic test: ", body);
      });
  });
  test("200: by order", () => {
    return request(app)
      .get("/api/articles?order=title")
      .expect(200)
      .then(({ body }) => {
        console.log("order test: ", body);
      });
  });
});

describe("GET: /api/comments", () => {
  test("200: responds with the comments objects with each comment having the correct properties", () => {
    return request(app)
      .get("/api/comments")
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        comments.forEach((comment) => {
          const { comment_id, article_id, body, votes, author, created_at } =
            comment;
          expect(typeof comment_id).toBe("number");
          expect(typeof article_id).toBe("number");
          expect(typeof body).toBe("string");
          expect(typeof votes).toBe("number");
          expect(typeof author).toBe("string");
          expect(typeof created_at).toBe("string");
        });
      });
  });
});

describe("GET: /api/articles/:articleId", () => {
  test("200: responds with the article objects containing the article of the id given having the correct properties", () => {
    return request(app)
      .get("/api/articles/3")
      .then(({ body }) => {
        const article = body.article;
        expect(article.article_id).toBe(3);
        expect(article.title).toBe("Eight pug gifs that remind me of mitch");
        expect(article.topic).toBe("mitch");
        expect(article.author).toBe("icellusedkars");
        expect(article.body).toBe("some gifs");
        expect(article.created_at).toBe("2020-11-03T09:12:00.000Z");
        expect(article.votes).toBe(0);
        expect(article.article_img_url).toBe(
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
        );
      });
  });
});
