// models/Association.js
const mongoose = require('mongoose');

const associationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Association = mongoose.model('Association', associationSchema);

//CRUD
//Create
async function createAssociation(data) {
  return await Association.create(data);
}

//Read by ID
async function getAssociationById(id) {
  return await Association.findById(id).populate('user_id');
}

//Update by ID
async function updateAssociation(id, data) {
  return await Association.findByIdAndUpdate(id, data, { new: true });
}

//Delete by ID
async function deleteAssociation(id) {
  return await Association.findByIdAndDelete(id);
}

module.exports = { Association, createAssociation, getAssociationById, updateAssociation, deleteAssociation };
