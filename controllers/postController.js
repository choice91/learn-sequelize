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

const postUpload = async (req, res) => {
  const { title, content } = req.body;
  try {
    await Post.create({
      title,
      content,
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const getPostDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const { dataValues } = await Post.findOne({
      where: { id: id },
    });
    const data = { detailData: dataValues };
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const postPostUpdate = async (req, res) => {
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

const getPostDelete = async (req, res) => {
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

module.exports = {
  getPostList,
  postUpload,
  getPostDetail,
  getPostDelete,
  postPostUpdate,
};
