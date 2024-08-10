const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
  foreignKey: 'userid',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'userid'
});

User.hasMany(Comment, {
  foreignKey: 'userid',
  onDelete: 'CASCADE'
});

Blog.hasMany(Comment, {
  foreignKey: 'blogid',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userid'
});

Comment.belongsTo(Blog, {
  foreignKey: 'blogid'
});

module.exports = { User, Blog, Comment };