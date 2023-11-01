const db = require("../services/database");
const tagModel = require("./tag.model");
const categoryModel = require("./category.model");
const postModel = require("./post.model");
const userModel = require("./user.model");
const postImgModel = require("./postImg.model");
const commentModel = require("./comment.model");

const Tag = tagModel(db);
const Category = categoryModel(db);
const Post = postModel(db);
const User = userModel(db);
const PostImg = postImgModel(db);
const Comment = commentModel(db);

//catergory has many posts and post must be belongs to category
Category.hasMany(Post, {
  foreignKey: {
    allowNull: false,
  },
});
Post.belongsTo(Category);

//user has many post and post must belongs to user
User.hasMany(Post, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Post.belongsTo(User);

//post has many tags and tag has many posts post must belongs to one tag at least
//tag can be not have any post
Post.belongsToMany(Tag, { through: "postTag" });
Tag.belongsToMany(Post, { through: "postTag" });

//post has many images
Post.hasMany(PostImg, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

PostImg.belongsTo(Post);

//comment must blong to post ,post maybe not have commment
Post.hasMany(Comment, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.belongsTo(Post);

//comment must blong to user ,user maybe not have commment
User.hasMany(Comment, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.belongsTo(User);

// generate tables in DB
db.sync({ force: false }).then(() => {
  console.log("Tables Created!");
});

module.exports = {
  Tag,
  Category,
  User,
  Post,
  Comment,
  PostImg,
};
