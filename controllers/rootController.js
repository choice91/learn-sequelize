const Post = require("../models/post.js");

const getPostList = async (req, res) => {
  const postData = await Post.findAll({ order: [["created_at", "desc"]] });
  return res.json(postData);
};

module.exports = {
  getPostList,
};
