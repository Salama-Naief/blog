const { DataTypes } = require("sequelize");

module.exports = (db) => {
  return db.define("postImg", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
