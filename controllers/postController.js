const Post = require("../models/post.js");

const postUpload = async (req, res) => {
  const { title, content } = req.body;
  await Post.create({
    title,
    content,
  });
  return res.sendStatus(200);
};

const getPostDetail = async (req, res) => {
  const { id } = req.params;
  const { dataValues } = await Post.findOne({
    where: { id: id },
  });
  const data = { detailData: dataValues };
  return res.json(data);
};

const postPostUpdate = async (req, res) => {
  const {
    params: { id },
    body: { title, content },
  } = req;
  await Post.update({ title, content }, { where: { id: id } });
  return res.end();
};

const getPostDelete = async (req, res) => {
  const { id } = req.params;
  const result = await Post.destroy({
    where: { id: id },
  });
  const code = result === 1 ? 200 : 202;
  return res.sendStatus(code);
};

module.exports = {
  postUpload,
  getPostDetail,
  getPostDelete,
  postPostUpdate,
};
