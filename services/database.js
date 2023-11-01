const { Sequelize } = require("sequelize");
const config = require("../config/config");

// Option 3: Passing parameters separately (other dialects)
module.exports = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: "localhost",
    dialect: "mysql",
  }
);
