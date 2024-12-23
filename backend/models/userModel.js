const { client } = require('../config/database');
const bcrypt = require('bcrypt');

const userCollection = client.db('Cluster0').collection('users');

const User = {
  create: async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
    user.points = 0;
    user.created_at = new Date().toISOString();
    const result = await userCollection.insertOne(user);
    return result;
  },

  findByUsername: async (username) => {
    return await userCollection.findOne({ username });
  }
};

module.exports = User;
