const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        content: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: "Post",
        tableName: "posts",
      }
    );
  }

  static associate(db) {}
};
