const { Op } = require("sequelize");
const { User } = require("../models");

const createOne = async (req, res) => {
  const user = await User.create(req.body);
  delete user.dataValues.password;
  res.status(201).json(user);
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const user = await User.update(req.body, {
    where: {
      id,
    },
  });
  if (user[0] === 1) {
    res.status(201).json({ msg: "user is updated" });
  } else {
    throw new Error(`something went wrong!`);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const user = await User.destroy({
    where: {
      id,
    },
  });
  if (user === 1) {
    res.status(201).json({ msg: "user is deleted" });
  } else {
    throw new Error("something went wrong");
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ["password"],
    },
  });
  if (!user) {
    throw new Error("user is not found");
  }
  res.status(201).json(user);
};

const getAll = async (req, res) => {
  const { search, page, limit } = req.query;
  const offest = page ? page * limit : 0;
  let filter = {};
  let limitFilter = limit ? parseInt(limit) : 20;
  if (search) {
    filter = {
      firstName: {
        [Op.like]: `%${search}%`,
      },
    };
  }
  const users = await User.findAll({
    where: filter,
    offset: offest,
    limit: limitFilter,
    attributes: {
      exclude: ["password"],
    },
  });
  res.status(200).json(users);
};

module.exports = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
};
