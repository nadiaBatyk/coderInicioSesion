const knexProducts = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "nadia",
    password: "1234",
    database: "pruebas",
  },
  pool: { min: 0, max: 10 },
});
module.exports = {
  knexProducts,
};
