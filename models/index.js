const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment')

User.hasMany(Blog, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    as: 'blogs'
});

User.hasMany(Comment, {
    foreignKey: 'userID',
    onDelete: 'CASCADE',
    as: 'userComments'
});

Blog.hasMany(Comment, {
    foreignKey: 'blogID',
    onDelete: 'CASCADE',
    as: 'blogComments'
});

Blog.belongsTo(User, {
    foreignKey: 'userID',
});

Comment.belongsTo(User, {
    foreignKey: 'userID'
});

Comment.belongsTo(Blog, {
    foreignKey: 'blogID'
});

module.exports = { User, Blog, Comment };
