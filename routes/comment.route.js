const {
  createOne,
  getAll,
  updateOne,
  getOne,
  deleteOne,
} = require("../controllers/comment.controller");

const router = require("express").Router();

router.route("/").post(createOne).get(getAll);
router.route("/:id").put(updateOne).get(getOne).delete(deleteOne);

module.exports = router;
