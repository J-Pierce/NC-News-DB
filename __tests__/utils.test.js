const {
  convertTimestampToDate,
  formatTopicsData,
  formatUsersData,
  formatArticlesData,
  formatCommentsData,
} = require("../db/seeds/utils");
const { checkExists, commentCount } = require("../models/utils.models");

const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});
describe("Test propDict", () => {
  test("Returns a new array", () => {
    const input = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
        img_url: "",
      },
    ];
    const output = formatTopicsData(input);
    expect(output).not.toBe(input);
  });
  test("Does not mutate the input", () => {
    const input = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
        img_url: "",
      },
    ];
    const control = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
        img_url: "",
      },
    ];
    formatTopicsData(input);
    expect(input).toEqual(control);
  });
  test("When passed one topic, returns a formatted array of its properties", () => {
    const input = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
        img_url: "",
      },
    ];
    const output = formatTopicsData(input);
    expect(output).toEqual([["mitch", "The man, the Mitch, the legend", ""]]);
  });
  test("When passed multiple topic, returns a formatted array of their properties", () => {
    const input = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
        img_url: "",
      },
      {
        description: "Not dogs",
        slug: "cats",
        img_url: "",
      },
      {
        description: "what books are made of",
        slug: "paper",
        img_url: "",
      },
    ];
    const output = formatTopicsData(input);
    expect(output).toEqual([
      ["mitch", "The man, the Mitch, the legend", ""],
      ["cats", "Not dogs", ""],
      ["paper", "what books are made of", ""],
    ]);
  });
});
describe("Test formatTopicsData", () => {
  test("Returns a new array", () => {
    const input = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
        img_url: "",
      },
    ];
    const output = formatTopicsData(input);
    expect(output).not.toBe(input);
  });
  test("Does not mutate the input", () => {
    const input = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
        img_url: "",
      },
    ];
    const control = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
        img_url: "",
      },
    ];
    formatTopicsData(input);
    expect(input).toEqual(control);
  });
  test("When passed one topic, returns a formatted array of its properties", () => {
    const input = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
        img_url: "",
      },
    ];
    const output = formatTopicsData(input);
    expect(output).toEqual([["mitch", "The man, the Mitch, the legend", ""]]);
  });
  test("When passed multiple topic, returns a formatted array of their properties", () => {
    const input = [
      {
        description: "The man, the Mitch, the legend",
        slug: "mitch",
        img_url: "",
      },
      {
        description: "Not dogs",
        slug: "cats",
        img_url: "",
      },
      {
        description: "what books are made of",
        slug: "paper",
        img_url: "",
      },
    ];
    const output = formatTopicsData(input);
    expect(output).toEqual([
      ["mitch", "The man, the Mitch, the legend", ""],
      ["cats", "Not dogs", ""],
      ["paper", "what books are made of", ""],
    ]);
  });
});
describe("Test formatUsersData", () => {
  test("Returns a new array", () => {
    const input = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    const output = formatUsersData(input);
    expect(output).not.toBe(input);
  });
  test("Does not mutate the input", () => {
    const input = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    const control = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    formatUsersData(input);
    expect(input).toEqual(control);
  });
  test("When passed one user, returns a formatted array of its properties", () => {
    const input = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];
    const output = formatUsersData(input);
    expect(output).toEqual([
      [
        "butter_bridge",
        "jonny",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      ],
    ]);
  });
  test("When passed multiple users, returns a formatted array of their properties", () => {
    const input = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
      {
        username: "icellusedkars",
        name: "sam",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      },
      {
        username: "rogersop",
        name: "paul",
        avatar_url:
          "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      },
      {
        username: "lurker",
        name: "do_nothing",
        avatar_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      },
    ];
    const output = formatUsersData(input);
    expect(output).toEqual([
      [
        "butter_bridge",
        "jonny",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      ],
      [
        "icellusedkars",
        "sam",
        "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      ],
      [
        "rogersop",
        "paul",
        "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      ],
      [
        "lurker",
        "do_nothing",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      ],
    ]);
  });
});
describe("Test formatArticlesData", () => {
  test("Returns a new array", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    const output = formatTopicsData(input);
    expect(output).not.toBe(input);
  });
  test("Does not mutate the input", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    const control = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    formatTopicsData(input);
    expect(input).toEqual(control);
  });
  test("When passed one articles, returns a formatted array of its properties", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    const output = formatArticlesData(input);
    expect(output).toEqual([
      [
        "Living in the shadow of a great man",
        "mitch",
        "butter_bridge",
        "I find this existence challenging",
        new Date(1594329060000),
        100,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
    ]);
  });
  test("When passed multiple articles, returns a formatted array of their properties", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1602828180000,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1604394720000,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    const output = formatArticlesData(input);
    expect(output).toEqual([
      [
        "Living in the shadow of a great man",
        "mitch",
        "butter_bridge",
        "I find this existence challenging",
        new Date(1594329060000),
        100,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "Sony Vaio; or, The Laptop",
        "mitch",
        "icellusedkars",
        "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        new Date(1602828180000),
        undefined,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
      [
        "Eight pug gifs that remind me of mitch",
        "mitch",
        "icellusedkars",
        "some gifs",
        new Date(1604394720000),
        undefined,
        "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      ],
    ]);
  });
});
describe("Test formatCommentsData", () => {
  test("Returns a new array", () => {
    const inputComment = [
      {
        username: "butter_bridge",
        name: "jonny",
        avatar_url:
          "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      },
    ];

    const inputFormattedArticle = [
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];

    const output = formatCommentsData(inputComment, inputFormattedArticle);
    expect(output).not.toBe(inputComment);
  });
  test("Does not mutate the input", () => {
    const inputComment = [
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
    ];

    const inputFormattedArticle = [
      {
        article_id: 9,
        title: "They're not exactly dogs, are they?",
        topic: "mitch",
        author: "butter_bridge",
        body: "Well? Think about it.",
        created_at: 1591438200000,
        votes: null,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];

    const control = [
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
    ];
    formatCommentsData(inputComment, inputFormattedArticle);
    expect(inputComment).toEqual(control);
  });
  test("When passed one comment, returns a formatted array of its properties", () => {
    const inputComment = [
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
    ];

    const inputFormattedArticle = [
      {
        article_id: 9,
        title: "They're not exactly dogs, are they?",
        topic: "mitch",
        author: "butter_bridge",
        body: "Well? Think about it.",
        created_at: 1591438200000,
        votes: null,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];

    const output = formatCommentsData(inputComment, inputFormattedArticle);
    expect(output).toEqual([
      [
        9,
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        16,
        "butter_bridge",
        new Date(1586179020000),
      ],
    ]);
  });
  test("When passed multiple comments, returns a formatted array of their properties", () => {
    const inputComment = [
      {
        article_title: "They're not exactly dogs, are they?",
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        votes: 16,
        author: "butter_bridge",
        created_at: 1586179020000,
      },
      {
        article_title: "Living in the shadow of a great man",
        body: "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        votes: 14,
        author: "butter_bridge",
        created_at: 1604113380000,
      },
      {
        article_title: "Eight pug gifs that remind me of mitch",
        body: "Ambidextrous marsupial",
        votes: 0,
        author: "icellusedkars",
        created_at: 1600560600000,
      },
    ];

    const inputFormattedArticle = [
      {
        article_id: 9,
        title: "They're not exactly dogs, are they?",
        topic: "mitch",
        author: "butter_bridge",
        body: "Well? Think about it.",
        created_at: 1591438200000,
        votes: null,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        article_id: 1,
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1594329060000,
        votes: 100,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
      {
        article_id: 3,
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1604394720000,
        votes: null,
        article_img_url:
          "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
      },
    ];
    const output = formatCommentsData(inputComment, inputFormattedArticle);
    expect(output).toEqual([
      [
        9,
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        16,
        "butter_bridge",
        new Date(1586179020000),
      ],

      [
        1,
        "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        14,
        "butter_bridge",
        new Date(1604113380000),
      ],

      [
        3,
        "Ambidextrous marsupial",
        0,
        "icellusedkars",
        new Date(1600560600000),
      ],
    ]);
  });
});
describe("Test checkExists", () => {
  test("When given a value, returns promise if row length > 0", () => {
    checkExists("articles", "article_id", "3").then((data) => {
      expect(data).toEqual([
        {
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: new Date(1604394720000),
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        },
      ]);
    });
  });

  test("When given a value not in table, rejects promise if row length = 0", () => {
    checkExists("articles", "article_id", "9999").catch((error) => {
      expect(error.msg).toBe("Resource Not Found");
    });
  });
});
