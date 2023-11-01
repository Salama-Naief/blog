//requirs
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const db = require("./services/database");
require("express-async-errors");

//route
const userRoute = require("./routes/user.route");
const tagRoute = require("./routes/tag.route");
const categoryRoute = require("./routes/category.route");
const postRoute = require("./routes/post.route");
const commentRoute = require("./routes/comment.route");
//const
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.json());

//testing database connection
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

//@desc serve static files from files uploads in the root
app.use(express.static(path.join(process.cwd(), "uploads")));

app.use("/api/users", userRoute);
app.use("/api/tags", tagRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comments", commentRoute);
app.use("/api/posts", postRoute);

app.use("/", (req, res) => {
  res.send("route is not found");
});
app.use((err, req, res, next) => {
  console.log("err", err.errors);
  let msg = "";
  if (Array.isArray(err.errors)) {
    msg = err.errors[0].message;
  } else {
    msg = err.message;
  }
  console.log("msg", msg);
  res.status(500).json({
    message: msg,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port=${PORT}`);
});
