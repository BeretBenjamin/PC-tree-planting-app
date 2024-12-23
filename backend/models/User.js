//models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['volunteer', 'association'], default: 'volunteer' },
  points: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

//CRUD
//CREATE
async function createUser(data) {
  return await User.create(data);
}

//Read by ID
async function getUserById(id) {
  return await User.findById(id);
}

//Update by ID
async function updateUser(id, data) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}

//Delete by ID
async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = { User, createUser, getUserById, updateUser, deleteUser };
