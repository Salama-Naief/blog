const { Op } = require("sequelize");
const { Tag } = require("../models");

const createOne = async (req, res) => {
  const tag = await Tag.create(req.body);
  res.status(201).json(tag);
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.update(req.body, {
    where: {
      id,
    },
  });
  if (tag[0] === 1) {
    res.status(201).json({ msg: "tag is updated" });
  } else {
    throw new Error(`something went wrong!`);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.destroy({
    where: {
      id,
    },
  });
  if (tag === 1) {
    res.status(201).json({ msg: "tag is deleted" });
  } else {
    throw new Error("something went wrong");
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const tag = await Tag.findOne({
    where: {
      id,
    },
  });
  if (!tag) {
    throw new Error("tag is not found");
  }
  res.status(201).json(tag);
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
  const tags = await Tag.findAll({
    where: filter,
    offset: offest,
    limit: limitFilter,
  });
  res.status(200).json(tags);
};

module.exports = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
};
