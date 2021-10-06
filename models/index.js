const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const Post = require("./post.js");

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Post = Post;

Post.init(sequelize);

Post.associate(db);

module.exports = db;
