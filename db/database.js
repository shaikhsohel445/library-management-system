const knex = require("knex");

const config = {
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "codetru",
    database: "Library_management_system",
  },
  pool: { min: 2, max: 10 },
};

const dbConnection = knex(config)  //master database connection

module.exports = { dbConnection, config }