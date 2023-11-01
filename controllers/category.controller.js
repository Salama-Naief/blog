const { Op } = require("sequelize");
const { Category } = require("../models");

const createOne = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const category = await Category.update(req.body, {
    where: {
      id,
    },
  });
  if (category[0] === 1) {
    res.status(201).json({ msg: "category is updated" });
  } else {
    throw new Error(`something went wrong!`);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const category = await Category.destroy({
    where: {
      id,
    },
  });
  if (category === 1) {
    res.status(201).json({ msg: "category is deleted" });
  } else {
    throw new Error("something went wrong");
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const category = await Category.findOne({
    where: {
      id,
    },
  });
  if (!category) {
    throw new Error("category is not found");
  }
  res.status(201).json(category);
};

const getAll = async (req, res) => {
  const { search, page, limit } = req.query;
  const offest = page ? page * limit : 0;
  let limitFilter = limit ? parseInt(limit) : 20;
  let filter = {};
  if (search) {
    filter = {
      firstName: {
        [Op.like]: `%${search}%`,
      },
    };
  }
  const categorys = await Category.findAll({
    where: filter,
    offset: offest,
    limit: limitFilter,
  });
  res.status(200).json(categorys);
};

module.exports = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
};
