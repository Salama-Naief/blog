const { Op } = require("sequelize");
const { Post, Category, User, Tag, PostImg, Comment } = require("../models");
const { uploadMixImage } = require("../services/uploads");
const sharp = require("sharp");

const uploadImages = uploadMixImage();
//@desc resize images
const resizeImages = async (req, res, next) => {
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `post-${Date.now()}-${index + 1}-${index + 1}.webp`;
        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("webp")
          .webp({ quality: 95 })
          .toFile(`uploads/post/${imageName}`);
        // Save image into our db
        req.body.images.push(imageName);
      })
    );
  }
  next();
};
const createOne = async (req, res) => {
  const { tagId, images, ...others } = req.body;
  console.log("files==>", req.body);
  const post = await Post.create(others);
  //get tag
  const tag = await Tag.findOne({ where: { id: tagId } });
  if (!tag) throw new Error("tag is not found");
  let imgs = [];
  if (images && images.length > 0) {
    await Promise.all(
      images.map(async (img) => {
        const image = await PostImg.create({ url: img, postId: post.id });
        imgs.push(image);
      })
    );
  }
  console.log("imgs", imgs);
  await post.addTag(tag);
  await post.addPostImgs(imgs);
  res.status(201).json(post);
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  const post = await Post.update(req.body, {
    where: {
      id,
    },
  });
  if (post[0] === 1) {
    res.status(201).json({ msg: "tag is updated" });
  } else {
    throw new Error(`something went wrong!`);
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  const post = await Post.destroy({
    where: {
      id,
    },
  });
  if (post === 1) {
    res.status(201).json({ msg: "tag is deleted" });
  } else {
    throw new Error("something went wrong");
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({
    where: {
      id,
    },
    include: [Category, User, Tag, PostImg, Comment],
  });
  if (!post) {
    throw new Error("post is not found");
  }
  res.status(201).json(post);
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
  const posts = await Post.findAll({
    where: filter,
    include: [Category, User, Tag, PostImg, Comment],
    offset: offest,
    limit: limitFilter,
  });
  res.status(200).json(posts);
};

module.exports = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
  uploadImages,
  resizeImages,
};
