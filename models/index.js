const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment')

User.hasMany(Blog, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    as: 'blogs'
});

User.hasMany(Comment, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    as: 'userComments'
});

Blog.hasMany(Comment, {
    foreignKey: 'blogId',
    onDelete: 'CASCADE',
    as: 'blogComments'
});

Blog.belongsTo(User, {
    foreignKey: 'userId',
});

Comment.belongsTo(User, {
    foreignKey: 'userId'
});

Comment.belongsTo(Blog, {
    foreignKey: 'blogId'
});

module.exports = { User, Blog, Comment };
