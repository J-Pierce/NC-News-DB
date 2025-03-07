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

// Articles tests
describe("GET: /api/articles", () => {
  describe("Functionality Tests", () => {
    test("200: When no query given, responds with the articles objects with each article having the correct properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;
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
    test("200: When no query given, returned articles sorted by created_at in an ascending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;
          expect(articles).toBeSorted({ key: "created_at" });
        });
    });
    test("200: When queried with author, returns articles by the specified author ", () => {
      return request(app)
        .get("/api/articles?author=rogersop")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;
          articles.forEach((article) => {
            expect(article.author).toBe("rogersop");
          });
        });
    });
    test("200: When queried with topic, returns articles with the specified topic", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;
          expect(articles).toEqual([
            {
              article_id: 5,
              title: "UNCOVERED: catspiracy to bring down democracy",
              topic: "cats",
              author: "rogersop",
              body: "Bastet walks amongst us, and the cats are taking arms!",
              created_at: "2020-08-03T13:14:00.000Z",
              votes: 0,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            },
          ]);
        });
    });
    test("200: When queried with sort, returns articles sorted by a specified table column ", () => {
      return request(app)
        .get("/api/articles?sort=title")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;
          expect(articles).toBeSorted({ key: "title" });
        });
    });
    test("200: When queried with sort and order, returns articles sorted by a specified table column either ASC or DESC", () => {
      return request(app)
        .get("/api/articles?sort=created_at&&order=desc")
        .expect(200)
        .then(({ body }) => {
          const articles = body.articles;
          expect(articles).toBeSorted({ key: "created_at", descending: true });
        });
    });
  });
  describe("Error Tests", () => {
    test("400: When queried with an invalid query, returns 'Bad Request'", () => {
      return request(app)
        .get("/api/articles?food=banana")
        .expect(400)
        .then(({ body }) => {
          const msg = body.msg;
          expect(msg).toBe("Bad Request");
        });
    });
    test("400: When queried with an invalid sort, returns 'Bad Request'", () => {
      return request(app)
        .get("/api/articles?sort=nonsense")
        .expect(400)
        .then(({ body }) => {
          const msg = body.msg;
          expect(msg).toBe("Bad Request");
        });
    });
    test("400: When queried with an invalid order, returns 'Bad Request'", () => {
      return request(app)
        .get("/api/articles?order=best")
        .expect(400)
        .then(({ body }) => {
          const msg = body.msg;
          expect(msg).toBe("Bad Request");
        });
    });
    test("404: When queried with a non-existing author, returns 'Resource not found'", () => {
      return request(app)
        .get("/api/articles?author=Stephen")
        .expect(404)
        .then(({ body }) => {
          const msg = body.msg;
          expect(msg).toBe("Resource not found");
        });
    });
    test("404: When queried with a non-existing topic, returns 'Resource not found'", () => {
      return request(app)
        .get("/api/articles?topic=banana")
        .expect(404)
        .then(({ body }) => {
          const msg = body.msg;
          expect(msg).toBe("Resource not found");
        });
    });
  });
});
