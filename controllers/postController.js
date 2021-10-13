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
  // req.decoded에 저장된 token의 payload
  const loggedInUserId = req.decoded.uid;
  try {
    // Post모델에서 req.params에 있는 id로 데이터 검색
    const post = await Post.findOne({ where: { id } });
    // post.UserId와 loggedInUserId가 같으면 작성된 글과 로그인한 사람이 같은 사람
    if (post.UserId === loggedInUserId) {
      await Post.update({ title, content }, { where: { id: id } });
      return res.status(200).json({ ok: true, message: "Update success" });
    }
    return res.status(403).json({ ok: false, message: "Update fail" });
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
