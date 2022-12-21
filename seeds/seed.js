const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, { individualHooks: true });

  for (const blog of blogData) {
    const userID = users[Math.floor(Math.random() * users.length)].id
    await Blog.create({ ...blog, userID })
  }

  await Comment.bulkCreate(commentData, { individualHooks: true })

  process.exit(0);
};

seedDatabase();
