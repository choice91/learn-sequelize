const Post = require("../models/post.js");

const getPosts = async (req, res) => {
  const result = await Post.findAll({});
  console.log(result);
  return res.send("Get posts");
};

module.exports = {
  getPosts,
};
