const Post = require("../models/post.js");

const postUpload = async (req, res) => {
  const result = await Post.create({
    title: "첫글!!",
    content: "첫 글 입니다!!!",
  });
  console.log(result);
  return res.end();
};

module.exports = {
  postUpload,
};
