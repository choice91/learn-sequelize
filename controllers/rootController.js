const Post = require("../models/post.js");

const getPostList = async (req, res) => {
  const postData = await Post.findAll({
    attributes: ["id", "title", "created_at"],
    order: [["created_at", "desc"]],
  });
  return res.json(postData);
};

module.exports = {
  getPostList,
};
