# NC News Seeding

### Hosted API: https://nc-news-b93u.onrender.com/api

---

### Summary:

This project is a server and database for "Northcoders News". The server is build with MVC architecture and handles multiple endpoints, paramaterised inputs, and a range of queries. A user can send requests to the server, which will then query the database and responded with the relavant information for the request. It has been built following test driven development and as such comes with a suite of tests to verify functionality and error handling. A list of valid requests and expected response formats can be found in the **endpoints.json** file.

---

### Guide:

To clone the repository, run in your terminal where you want the folder to be located:

    git clone https://github.com/J-Pierce/NC-News-DB.git

Once cloned, open the folder in an IDE such as VS Code. To install dependencies, in your terminal run:

    npm install

To finish the setup you will need to make the environment files documented **below**. Once this is done the databases can be seeded by running in your terminal:

    npm run setup-dbs
    npm run seed
    npm run test-seed

The final test-seed script will run the test files to confirm that everything is running correctly. At this point, the database and server are set up.

To run tests using the test data, in your terminal run:

    npm test __tests__/<test_file_name>

To run the server using development data, in your terminal run:

    npm run start

This will open the server to listen for requests on port 9090

---

### Environment Files:

For the server to run correctly using the correct data you need to create the following .env files at the root level in the folder:

    Name:       .env.production
    Content:    DATABASE_URL=postgresql://postgres.pcbenllcpntyorneohsx:3DeBkLsPdzX@aws-0-eu-west-2.pooler.supabase.com:6543/postgres

    Name:       .env.development
    Content:    PGDATABASE=nc_news

    Name:       .env.test
    Content:    PGDATABASE=nc_news_test

---

### Modules:

The minimum versions of modules needed to run the project:

    Node.js     v23.7.0
    Postgres    v8.13.3

---
