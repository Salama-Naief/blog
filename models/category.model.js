const { DataTypes } = require("sequelize");

module.exports = (db) => {
  return db.define(
    "categories",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 10],
          notEmpty: {
            arg: true,
            msg: "please enter category title",
          },
        },
      },
    },
    { timestamps: true }
  );
};
