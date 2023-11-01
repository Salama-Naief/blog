const { DataTypes } = require("sequelize");

module.exports = (db) => {
  return db.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 10],
        notEmpty: {
          arg: true,
          msg: "please enter post title",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [20],
        notEmpty: {
          arg: true,
          msg: "please enter post description",
        },
      },
    },
    rate: {
      type: DataTypes.DECIMAL(2, 2),
      default: 0,
    },
  });
};
