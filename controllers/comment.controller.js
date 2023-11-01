const { Op } = require("sequelize");
const { Post, Comment, Category, User, Tag } = require("../models");

const createOne = async (req, res) => {
  const comment = await Comment.create(req.body);
  res.status(201).json(comment);
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.update(req.body, {
    where: {
      id,
    },
  });
  if (comment[0] === 1) {
    res.status(201).json({ msg: "comment is updated" });
  } else {
    throw new Error(`something went wrong!`);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.destroy({
    where: {
      id,
    },
  });
  if (comment === 1) {
    res.status(201).json({ msg: "comment is deleted" });
  } else {
    throw new Error("something went wrong");
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findOne({
    where: {
      id,
    },
    include: [Post, User],
  });
  if (!comment) {
    throw new Error("Comment is not found");
  }
  res.status(201).json(comment);
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
  const comments = await Comment.findAll({
    where: filter,
    include: [User, Post],
    offset: offest,
    limit: limitFilter,
  });
  res.status(200).json(comments);
};

module.exports = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
};
