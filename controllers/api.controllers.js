exports.getApi = (request, response) => {
  const endpoints = {
    "GET /api": {
      description:
        "serves up a json representation of all the available endpoints of the api",
    },
    "GET /api/topics": {
      description: "serves an array of all topics",
      queries: [],
      exampleResponse: {
        topics: [{ slug: "football", description: "Footie!" }],
      },
    },
    "GET /api/articles": {
      description: "serves an array of all articles",
      queries: ["author", "topic", "sort_by", "order"],
      exampleResponse: {
        articles: [
          {
            title: "Seafood substitutions are increasing",
            topic: "cooking",
            author: "weegembump",
            body: "Text from the article..",
            created_at: "2018-05-30T15:59:13.341Z",
            votes: 0,
            comment_count: 6,
          },
        ],
      },
    },
  };
  response.status(200).send({ endpoints: endpoints });
};
