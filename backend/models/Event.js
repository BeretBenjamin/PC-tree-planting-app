// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  association_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Association', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  max_volunteers: { type: Number, default: 0 },
  volunteers: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['confirmed', 'pending', 'cancelled'], default: 'pending' }
    }
  ]
});

const Event = mongoose.model('Event', eventSchema);

//CRUD
//Create
async function createEvent(data) {
  return await Event.create(data);
}

//Read by ID
async function getEventById(id) {
  return await Event.findById(id).populate('association_id').populate('volunteers.user_id');
}

//Update by ID
async function updateEvent(id, data) {
  return await Event.findByIdAndUpdate(id, data, { new: true });
}

//Delete by ID
async function deleteEvent(id) {
  return await Event.findByIdAndDelete(id);
}

module.exports = { Event, createEvent, getEventById, updateEvent, deleteEvent };
