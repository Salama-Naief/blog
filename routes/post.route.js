const {
  createOne,
  getAll,
  updateOne,
  getOne,
  deleteOne,
  uploadImages,
  resizeImages,
} = require("../controllers/post.controller");

const router = require("express").Router();

router.route("/").post(uploadImages, resizeImages, createOne).get(getAll);
router.route("/:id").put(updateOne).get(getOne).delete(deleteOne);

module.exports = router;
