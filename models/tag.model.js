const { DataTypes } = require("sequelize");

module.exports = (db) => {
  return db.define("tags", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 10],
        notEmpty: {
          arg: true,
          msg: "please enter tag title",
        },
      },
    },
  });
};
