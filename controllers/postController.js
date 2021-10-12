const Post = require("../models/post.js");
const User = require("../models/user.js");

exports.getPostList = async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: ["id", "title", "createdAt"],
      order: [["createdAt", "desc"]],
    });
    return res.status(200).json(postData);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.postUpload = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user;
  try {
    await Post.create({
      title,
      content,
      UserId: id,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.getPostDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({
      where: { id: id },
    });
    const { title, content, createdAt } = post.dataValues;
    const { UserId } = post.dataValues;
    const user = await User.findOne({ where: { id: UserId } });
    const { username } = user.dataValues;
    const data = {
      detailData: {
        id: post.dataValues.id,
        title,
        content,
        createdAt,
        username,
      },
    };
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.postPostUpdate = async (req, res) => {
  const {
    params: { id },
    body: { title, content },
  } = req;
  try {
    await Post.update({ title, content }, { where: { id: id } });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

exports.getPostDelete = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.destroy({
      where: { id: id },
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
