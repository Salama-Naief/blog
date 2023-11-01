const { DataTypes } = require("sequelize");

module.exports = (db) => {
  return db.define("comment", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rate: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        max: 5,
        min: 0,
      },
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
