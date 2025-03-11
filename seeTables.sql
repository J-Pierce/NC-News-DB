\c nc_news

-- SELECT author, title, article_id, topic, created_at, votes, article_img_url FROM articles ORDER By created_at DESC

-- SELECT article_id, COUNT(comment_id) AS comment_count FROM comments GROUP BY article_id ORDER BY article_id

SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles FULL OUTER JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY articles.article_id

