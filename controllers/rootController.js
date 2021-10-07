const Post = require("../models/post.js");

const getPostList = async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "created_at"],
      order: [["created_at", "desc"]],
    });
    return res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  getPostList,
};
