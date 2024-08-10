const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      allowNull: false,
    },
    blogid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;