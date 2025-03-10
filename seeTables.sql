\c nc_news_test

-- SELECT * FROM topics;

-- SELECT * FROM users;

-- SELECT * FROM articles;

SELECT article_id FROM comments;

-- SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'articles'

SELECT article_id, COUNT(*) AS comment_count FROM comments GROUP BY article_id
