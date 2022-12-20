const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
  });

  for (const blog of blogData) {
    const userId = users[Math.floor(Math.random() * users.length)].id
    await Blog.create({ ...blog, userId })
  }

  process.exit(0);
};

seedDatabase();
